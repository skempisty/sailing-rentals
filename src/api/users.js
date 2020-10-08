const User = require('../models/User');

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

exports.createUser = async (body) => {
  const { googleId, } = body;

  try {
    const user = await User.findOne({ googleId });

    if (user) {

    }
    //   if (user) {return cb(null, user)};
    //   var newUser = new User({
    //     handle: profile.displayName,
    //     flickrId: profile.id,
    //     name: profile.fullName
    //   });
    //   getBuddyIcon(newUser, profile).then(function(newUser) {
    //     newUser.save(function(err) {
    //       if (err) {return cb(err)};
    //       return cb(null, newUser);
    //     });
    //   });
    // });
  } catch (error) {
    console.error(error);
  }
};
