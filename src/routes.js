// require npm packages
const express = require ('express');
// require files
const api = require('./apiDispatcher');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await api.users.getUsers();

  res.send(users);
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
