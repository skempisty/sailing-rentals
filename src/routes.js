const express = require ('express')
const jwt = require('jsonwebtoken')

const api = require('./apiDispatcher')
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

  const decoded = jwt.verify(jwtToken.split(' ')[1], process.env.JWT_SECRET)

  if (decoded) {
    const userId = decoded.userId;

    const user = await api.users.getUserById(userId)

    res.send(user);
  } else {
    res.status(401).send('Error accessing logged in user')
  }
})

router.get('/users', async (req, res) => {
  const { authorization: jwtToken } = req.headers

  const decoded = jwt.verify(jwtToken.split(' ')[1], process.env.JWT_SECRET)

  if (decoded.isAdmin) {
    const users = await api.users.getUserList();

    res.send(users)
  } else {
    res.status(401).send('Unauthorized user')
  }
})

router.put('/users/:id/approve', async (req, res) => {
  const { id } = req.params

  await api.users.approveUser(id);

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

module.exports = router;
