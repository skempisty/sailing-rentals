const usersUtil = require('../utils/usersUtil');

exports.getUsers = async () => {
  return [
    {
      _id: 0,
      name: 'Stephen Kempisty'
    },
    {
      _id: 1,
      name: 'Mitchell Kempisty'
    },
    {
      _id: 2,
      name: 'Some Guy'
    }
  ];
};
