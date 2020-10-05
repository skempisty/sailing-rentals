// require npm packages
const express = require ('express');
// require files
const api = require('./apiDispatcher');

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await api.users.getUsers();

    res.send(users);
});

module.exports = router;
