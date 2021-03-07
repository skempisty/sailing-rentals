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

      res.send([])
    }
  } else {
    res.status(401).send('Unauthorized Google login')
  }
});

module.exports = router;
