require('dotenv').config()
const express = require('express')

const api = require('./apiDispatcher')
const decodeJwt = require('./utils/decodeJwt')
const getNewLoginJwt = require('./utils/getNewLoginJwt')
const googleTokenIdToUser = require('./utils/googleTokenIdToUser')

// adds form-data/multipart data from request into req.files
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const ClassRegistrationDto = require('./dto/ClassRegistrationDto')

const router = express.Router()

/*******************************************************************************
 * GENERAL
 */

/**
 * Health Check
 */
router.get('/health', async (req, res) => {
  res.send('ok')
})

/**
 * Initialize site data. Data returned should always be all the user will need to load the site
 */
router.get('/site_data', async (req, res) => {
  const { authorization: authHeader } = req.headers

  let currentUser = null
  let updatedJwt = null
  let users = []
  let myRentals = []
  let myPayments = []
  let allPayments = []
  let allRentals = []

  const hasJwtToken = 'null' !== authHeader.split(' ')[1]

  // user is logged in
  if (hasJwtToken) {
    const { userId, isAdmin } = await decodeJwt(authHeader)

    // get personal data
    currentUser = await api.users.getUserById(userId)
    myRentals = await api.rentals.getMyRentals(userId)
    myPayments = await api.payments.getMyPayments(userId)

    // cant rent without logging in
    allRentals = await api.rentals.getAllRentals()

    // get updated jwt for initialization
    updatedJwt = getNewLoginJwt(currentUser)

    // user is an admin
    if (isAdmin) {
      users = await api.users.getUserList()
      allPayments = await api.payments.getAllPayments()
    }
  }

  const boats = await api.boats.getBoats()
  const posts = await api.posts.getPosts()
  const carouselSlides = await api.carouselSlides.getCarouselSlides()
  const settings = await api.settings.getSettings()

  res.send({
    currentUser,
    users,
    boats,
    carouselSlides,
    posts,
    myRentals,
    allRentals,
    myPayments,
    allPayments,
    settings,
    updatedJwt
  })
})

/**
 * Login or create a user using a google token id. Get back all information for the logged in user
 */
router.post('/logged_in_data', async (req, res) => {
  const { googleTokenId } = req.body

  const googleUser = await googleTokenIdToUser(googleTokenId)

  if (googleUser) { // Check if google login is authenticated
    let currentUser = await api.users.getUserByGoogleId(googleUser.sub) // .sub is users google id

    if (!currentUser) {
      currentUser = await api.users.createUser(googleUser)
    }

    const jwt = getNewLoginJwt(currentUser)

    let users = []
    let allPayments = []

    // get personal data
    const myRentals = await api.rentals.getMyRentals(currentUser.id)
    const myPayments = await api.payments.getMyPayments(currentUser.id)

    // cant rent without logging in
    const allRentals = await api.rentals.getAllRentals()

    // user is an admin
    if (currentUser.isAdmin) {
      users = await api.users.getUserList()
      allPayments = await api.payments.getAllPayments()
    }

    res.send({
      currentUser,
      users,
      myRentals,
      allRentals,
      myPayments,
      allPayments,
      jwt
    })
  } else {
    res.status(401).send('Unauthorized Google login token')
  }
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
    const deletedUser = await api.users.deleteUser(id)

    res.send(deletedUser)
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

  const { paypalAuthorizationId: authorizationId, orderId } = paymentPostBody

  if (!authorizationId) {
    res.status(400).send('Create rental failed. No paypal authorization ID received.')
    return
  }

  const { userId: creatorId, isApproved } = await decodeJwt(jwtToken);

  if (!isApproved) {
    return res.status(401).send('User not approved to make rentals')
    return
  }

  try {
    if (process.env.PAYPAL_CLIENT_ID !== 'sb') {
      /*
       * Verify order information
       */
      const order = await api.paypal.getPaypalOrderByOrderId(orderId)

      // Validate the transaction details are as expected
      if (order.result.purchase_units[0].amount.value !== paymentPostBody.amount) {
        return res.send(400)
      }
    }

    /*
     * Insert rental and payment w auth Id into DB
     */
    // TODO: maybe combining these 2 insert queries will be a good idea. Speed up and atomize?
    const rental = await api.rentals.createRental(creatorId, rentalPostBody)
    // payments belong to a rental - so rental must be created first
    const payment = await api.payments.createPayment(creatorId, rental.id, paymentPostBody)

    let captureId

    if (process.env.PAYPAL_CLIENT_ID !== 'sb') {
      /*
       * Actually capture the payment using the auth Id
       */
      captureId = await api.paypal.capturePaymentWithAuthorizationId(authorizationId)
    } else {
      captureId = '-1'
    }

    await api.payments.updateCaptureId(payment.id, captureId)

    res.send({ rental, payment })
  } catch (error) {
    // TODO: extract this catch response behavior to middleware like in broadcasts. It should be the same every time
    switch (error.name) {
      case 'ValidationError':
        res.status(422).send(error.message)
        break
      default:
        res.status(500).send(`Error creating rental: ${JSON.stringify(error)}`)
    }
  }
})

router.post('/rentals/nopay', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { rental: rentalPostBody } = req.body

  const { isAdmin, userId: creatorId } = await decodeJwt(jwtToken);

  if (!isAdmin) {
    res.status(401).send('You don\'t have permission to book this boat block out')
  }

  const rental = await api.rentals.createRental(creatorId, rentalPostBody)

  res.send({ rental })
})

router.put('/rentals/:id', async (req, res) => {
  const { id: rentalId } = req.params
  const { authorization: jwtToken } = req.headers
  const updateFields = req.body

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  // only allow this action if the logged in user matches the id, or token belongs to an admin
  if (isAdmin || String(updateFields.rentedBy) === String(userId)) {
    try {
      const updatedRental = await api.rentals.updateRental(updateFields, rentalId, userId)

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

/*******************************************************************************
 * Settings
 */

/*** ADMIN ONLY */
router.put('/settings', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const updatedSettingsObj = req.body

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const updatedSettings = await api.settings.updateSettings(updatedSettingsObj)

    res.send(updatedSettings)
  } else {
    res.status(401).send('You don\'t have permission to update settings')
  }
})

/*******************************************************************************
 * Classes
 */

router.get('/classes', async (req, res) => {
  const classes = await api.classes.getClasses()

  res.send(classes)
})

router.get('/classes/:id', async (req, res) => {
  const { id } = req.params

  const klass = await api.classes.getClass(id)

  res.send(klass)
})

/*** ADMIN ONLY */
router.post('/classes', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const klass = req.body

  const { userId: creatorId, isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const newClass = await api.classes.createClass(klass, creatorId)

    res.send(newClass)
  } else {
    res.status(401).send('You don\'t have permission to create this class')
  }
})

/*** ADMIN ONLY */
router.put('/classes/:id', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const id = req.params.id
  const updatedClassObj = req.body

  const { isAdmin, userId: updaterId } = await decodeJwt(jwtToken)

  if (isAdmin) {
    const updatedClass = await api.classes.updateClass(id, updatedClassObj, updaterId)

    res.send(updatedClass)
  } else {
    res.status(401).send('You don\'t have permission to update this class')
  }
})

/*** ADMIN ONLY */
router.delete('/classes/:id', async (req, res) => {
  const { id } = req.params
  const { authorization: jwtToken } = req.headers

  const { isAdmin } = await decodeJwt(jwtToken)

  if (isAdmin) {
    await api.classes.deleteClass(id)

    res.send('ok')
  } else {
    res.status(401).send('You don\'t have permission to delete this class')
  }
})

/*******************************************************************************
 * Class Registrations
 */

router.get('/class_registrations', async (req, res) => {
  const registrations = await api.classes.getClassRegistrations()

  res.send(registrations)
})

router.post('/class_registrations', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const { userId, isAdmin } = await decodeJwt(jwtToken)

  const classRegistrationDto = new ClassRegistrationDto({ ...req.body, userId })

  if (classRegistrationDto.payPalData) {
    const newClassRegistration = await api.classes.createPaidClassRegistration(classRegistrationDto)

    res.send(newClassRegistration)
  } else if (isAdmin) {
    // create free class registration
    const newClassRegistration = await api.classes.createFreeClassRegistration(classRegistrationDto)

    res.send(newClassRegistration)
  } else {
    res.status(400).send('Only Admins may register for classes without an attached paypal transaction')
  }
})

module.exports = router
