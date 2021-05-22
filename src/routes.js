const express = require ('express')

const api = require('./apiDispatcher')
const decodeJwt = require('./utils/decodeJwt')
const getNewLoginJwt = require('./utils/getNewLoginJwt')
const googleTokenIdToUser = require('./utils/googleTokenIdToUser')

// adds form-data/multipart data from request into req.files
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()

/*******************************************************************************
 * GENERAL
 */

/**
 * Health Check
 */
router.get('/health', async (req, res) => {
  res.send(`ok ${process.env.BASE_URL}`)
})

/*******************************************************************************
 * Image Upload
 */

/**
 * Upload an image to Backblaze storage - get back friendly url for image download
 */
/*** ADMIN ONLY */
router.post('/images', upload.any(), async (req, res) => {
  const buffer = req.files[0].buffer
  const { category: imageCategory } = req.query
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const fileDownloadUrl = await api.images.uploadFile(buffer, imageCategory)

    res.send(fileDownloadUrl)
  } else {
    res.status(401).send('Only admins may upload a file')
  }
})

/*******************************************************************************
 * USERS
 */

/**
 * Log a user in using a google token id
 */
router.post('/users/login', async (req, res) => {
  const { googleTokenId } = req.body

  const googleUser = await googleTokenIdToUser(googleTokenId)

  if (googleUser) { // Check if google login is authenticated
    let user = await api.users.getUserByGoogleId(googleUser.sub) // .sub is users google id

    if (!user) {
      user = await api.users.createUser(googleUser)
    }

    const freshJwt = getNewLoginJwt(user)

    // return the user and a jwt
    res.send({ user, jwt: freshJwt });
  } else {
    res.status(401).send('Unauthorized Google login token')
  }
})

/**
 * Get the logged in User using jwt token on session storage
 */
router.get('/users/logged_in', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { userId } = await decodeJwt(jwtToken)

  if (userId) {
    const user = await api.users.getUserById(userId)

    /*
     * JWT decoded earlier - can assume this is the rightful user.
     * Issue a new token here in case user details have changed
     */
    const updatedJwt = getNewLoginJwt(user)

    res.send({ user, updatedJwt })
  } else {
    res.status(401).send('Error accessing logged in user')
  }
})

/*** ADMIN ONLY */
router.get('/users', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const users = await api.users.getUserList()

    res.send(users)
  } else {
    res.status(401).send('Unauthorized user')
  }
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  // only allow this action if the logged in user matches the id, or token belongs to an admin
  if (isAdmin || id === String(userId)) {
    const updatedUser = await api.users.updateUser(id, updateFields, isAdmin)

    res.send(updatedUser)
  } else {
    res.status(401).send('You don\'t have permission to update this user')
  }
})

/*** ADMIN ONLY */
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  const isDeletingSelf = Number(userId) === Number(id)

  if (isAdmin && !isDeletingSelf) {
    await api.users.deleteUser(id)

    res.send('ok')
  } else {
    if (isDeletingSelf) {
      res.status(400).send('You cannot delete yourself')
    } else {
      res.status(401).send('You don\'t have permission to delete this user')
    }
  }
})

/*******************************************************************************
 * CAROUSEL SLIDES
 */

router.get('/carousel_slides', async (req, res) => {
  const slides = await api.carouselSlides.getCarouselSlides();

  res.send(slides)
})

/*** ADMIN ONLY */
router.post('/carousel_slides', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { slideImageUrl } = req.body

  const { userId: creatorId, isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const newSlide = await api.carouselSlides.createCarouselSlide(creatorId, slideImageUrl)

    res.send(newSlide)
  } else {
    res.status(401).send('You don\'t have permission to create this carousel slide')
  }
})

/*** ADMIN ONLY */
router.put('/carousel_slides/rearrange', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const sortIdOrder = req.body

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    await api.carouselSlides.rearrangeCarouselSlides(sortIdOrder)

    res.send('ok')
  } else {
    res.status(401).send('You don\'t have permission to rearrange these slides')
  }
})

/*** ADMIN ONLY */
router.put('/carousel_slides/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const updatedSlide = await api.carouselSlides.updateCarouselSlide(id, updateFields)

    res.send(updatedSlide)
  } else {
    res.status(401).send('You don\'t have permission to update this slide')
  }
})

/*** ADMIN ONLY */
router.delete('/carousel_slides/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const deletedSlide = await api.carouselSlides.deleteCarouselSlide(id)

    res.send(deletedSlide)
  } else {
    res.status(401).send('You don\'t have permission to delete this slide')
  }
})

/*******************************************************************************
 * POSTS
 */

router.get('/posts', async (req, res) => {
  const posts = await api.posts.getPosts();

  res.send(posts)
})

/*** ADMIN ONLY */
router.post('/posts', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { post } = req.body

  const { userId: creatorId, isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const newPost = await api.posts.createPost(creatorId, post)

    res.send(newPost)
  } else {
    res.status(401).send('You don\'t have permission to create this post')
  }
})

/*** ADMIN ONLY */
router.put('/posts/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const updatedPost = await api.posts.updatePost(id, updateFields)

    res.send(updatedPost)
  } else {
    res.status(401).send('You don\'t have permission to update this post')
  }
})

/*** ADMIN ONLY */
router.delete('/posts/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const deletedPost = await api.posts.deletePost(id)

    res.send(deletedPost)
  } else {
    res.status(401).send('You don\'t have permission to delete this post')
  }
})

/*******************************************************************************
 * BOATS
 */

router.get('/boats', async (req, res) => {
  const boats = await api.boats.getBoats();

  res.send(boats)
})

/*** ADMIN ONLY */
router.post('/boats', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { boat } = req.body

  const { userId: creatorId, isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const newBoat = await api.boats.createBoat(creatorId, boat)

    res.send(newBoat)
  } else {
    res.status(401).send('You don\'t have permission to create this boat')
  }
})

/*** ADMIN ONLY */
router.put('/boats/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const updatedBoat = await api.boats.updateBoat(id, updateFields)

    res.send(updatedBoat)
  } else {
    res.status(401).send('You don\'t have permission to update this boat')
  }
})

/*** ADMIN ONLY */
router.delete('/boats/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const deletedBoat = await api.boats.deleteBoat(id)

    res.send(deletedBoat)
  } else {
    res.status(401).send('You don\'t have permission to delete this boat')
  }
})

/*******************************************************************************
 * RENTALS
 */

router.get('/rentals', async (req, res) => {
  const rentals = await api.rentals.getAllRentals();

  res.send(rentals)
})

router.get('/rentals/my', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { userId } = await decodeJwt(jwtToken)

  const rentals = await api.rentals.getMyRentals(userId)

  res.send(rentals)
})

router.post('/rentals', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { rental: rentalPostBody, payment: paymentPostBody } = req.body

  const { userId: creatorId } = await decodeJwt(jwtToken);

  try {
    const rental = await api.rentals.createRental(creatorId, rentalPostBody)
    // payments belong to a rental - so rental must be created first
    const payment = await api.payments.createPayment(creatorId, rental.id, paymentPostBody)

    res.send({ rental, payment })
  } catch (error) {
    // TODO: extract this catch response behavior. It should be the same every time
    switch (error.name) {
      case 'ValidationError':
        res.status(422).send(error.message)
        break
      default:
        res.status(500).send(`Error creating rental: ${JSON.stringify(error)}`)
    }
  }
})

router.put('/rentals/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  // only allow this action if the logged in user matches the id, or token belongs to an admin
  if (isAdmin || String(updateFields.rentedBy) === String(userId)) {
    try {
      const updatedRental = await api.rentals.updateRental(id, updateFields, isAdmin)

      res.send(updatedRental)
    } catch (error) {
      switch (error.name) {
        case 'ValidationError':
          res.status(422).send(error.message)
          break
        default:
          res.status(500).send(`Error creating rental: ${JSON.stringify(error)}`)
      }
    }
  } else {
    res.status(401).send('You don\'t have permission to update this rental')
  }
})

router.delete('/rentals/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  const rental = await api.rentals.getRental(id)

  if (isAdmin || String(rental.rentedBy) === String(userId)) {
    const deletedRental = await api.rentals.deleteRental(id)

    res.send(deletedRental)
  } else {
    res.status(401).send('You don\'t have permission to delete this rental')
  }
})

/*******************************************************************************
 * Payments
 */

/*** ADMIN ONLY */
router.get('/payments', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const allPayments = await api.payments.getAllPayments();

    res.send(allPayments)
  } else {
    res.status(401).send('You don\'t have permission to read all payments')
  }
})

router.get('/payments/my', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { userId } = await decodeJwt(jwtToken)

  const myPayments = await api.payments.getMyPayments(userId);

  res.send(myPayments)
})

module.exports = router
