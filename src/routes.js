const express = require ('express')
const jwt = require('jsonwebtoken')

const api = require('./apiDispatcher')
const decodeJwt = require('./utils/decodeJwt')
const googleTokenIdToUser = require('./utils/googleTokenIdToUser')

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
 * USERS
 */

/**
 * Log a user in using a google token id
 */
router.post('/users/login', async (req, res) => {
  const { googleTokenId } = req.body

  const googleUser = await googleTokenIdToUser(googleTokenId)

  if (googleUser) { // Check if google login is authenticated
    let user = await api.users.getUserByGoogleId(googleUser.sub); // .sub is users google id

    if (!user) {
      user = await api.users.createUser(googleUser)
    }

    const freshJwt = jwt.sign({
      userId: user.id,
      isAdmin: user.is_admin
    }, process.env.JWT_SECRET)

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

    res.send(user)
  } else {
    res.status(401).send('Error accessing logged in user')
  }
})

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
    const updatedUser = await api.users.updateUser(id, updateFields)

    res.send(updatedUser)
  } else {
    res.status(401).send('You don\'t have permission to update this user')
  }
})

router.put('/users/:id/approve', async (req, res) => {
  const { id } = req.params

  await api.users.approveUser(id)

  return true
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  await api.users.deleteUser(id);

  return true
})

/*******************************************************************************
 * CAROUSEL SLIDES
 */

router.get('/carousel_slides', async (req, res) => {
  const slides = await api.carouselSlides.getCarouselSlides();

  res.send(slides)
})

// router.post('/carousel_slides', async (req, res) => {
//
// })

/*******************************************************************************
 * POSTS
 */

router.get('/posts', async (req, res) => {
  const posts = await api.posts.getPosts();

  res.send(posts)
})

/*******************************************************************************
 * BOATS
 */

router.get('/boats', async (req, res) => {
  const boats = await api.boats.getBoats();

  res.send(boats)
})

router.post('/boats', async (req, res) => {
  const { authorization: jwtToken } = req.headers
  const { name } = req.body

  const { userId: creatorId } = await decodeJwt(jwtToken);

  const boats = await api.boats.createBoat(creatorId, name);

  res.send(boats)
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

module.exports = router;
