const db = require('../connectDb')

exports.getUsers = async () => {
  const users = await db.query('SELECT * FROM users')

  console.log('users', users)

  return users
};

exports.getUser = async (id) => {
  const user = await db.query('SELECT * FROM users WHERE google_id = ?', [id])

  console.log('user', user)

  return user
};

exports.createUser = async (body) => {
  // const { googleId, } = body;
  //
  // const user = await User.findOne({ googleId });
  //
  // if (user) {
  //
  // }
};
