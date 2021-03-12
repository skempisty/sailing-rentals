const express = require ('express')

const api = require('./apiDispatcher')
const googleTokenIdToUser = require('./utils/googleTokenIdToUser')

const router = express.Router()

/**
 * Get the logged in User. If doesn't exist, create an unapproved new user.
 */
router.get('/users/logged_in', async (req, res) => {
  const { authorization: token } = req.headers

  const googleUser = await googleTokenIdToUser(token)

  if (googleUser) {
    const user = await api.users.getUser(googleUser.sub);

    if (user[0]) {
      res.send(user);
    } else {
      await api.users.createUser(googleUser)

      const newUser = await api.users.getUser(googleUser.sub);

      res.send(newUser)
    }
  } else {
    res.status(401).send('Unauthorized Google login')
  }
})

router.get('/users', async (req, res) => {
  const { authorization: token } = req.headers

  const googleUser = await googleTokenIdToUser(token)

  if (googleUser) {
    const requestingUser = await api.users.getUser(googleUser.sub);

    if (requestingUser[0].is_admin) {
      const users = await api.users.getUserList();

      res.send(users)
    } else {
      res.status(401).send('Unauthorized user')
    }
  } else {
    res.status(401).send('Unauthorized Google login token detected')
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

router.get('/homepage_carousel_slides', async (req, res) => {
  const slides = await api.homepageCarouselSlides.getHomepageCarouselSlides();
})

router.post('/homepage_carousel_slides', async (req, res) => {
  const { authorization: token } = req.headers

  // TODO: decode jwt and get userId
  // const userId = getUserIdFromJwt(token);

  if (userId && userId.isAdmin) {
    const requestingUser = await api.homepageCarouselSlides.getHomepageCarouselSlides(userId);
  } else {

  }

  const requestingUser = await api.homepageCarouselSlides.getHomepageCarouselSlides(googleUser.sub);

  if (requestingUser[0].is_admin) {
    const users = await api.users.getUserList();

    res.send(users)
  } else {
    res.status(401).send('Unauthorized user')
  }
})

module.exports = router;
