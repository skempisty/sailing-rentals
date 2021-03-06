// require npm packages
const express = require ('express');
// require files
const api = require('./apiDispatcher');

const router = express.Router();

/**
 * Get all Users
 */
router.get('/users', async (req, res) => {
  const users = await api.users.getUsers();

  res.send(users);
});

/**
 * Get a User
 */
router.get('/user/:id', async (req, res) => {
  const { id: googleId } = req.params

  const user = await api.users.getUser(googleId);

  res.send(user);
});

/**
 * Create a User
 */
router.post('/users', async (req, res) => {
  const { body } = req;

  const broadcast = await api.users.createUser(body);

  return res.json(broadcast)
});

module.exports = router;
