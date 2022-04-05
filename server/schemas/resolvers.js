const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
  Mutation: {
    addUser: async (parent, {username,email,password}) => {
      const user = await User.create({username,email,password});
      const token = signToken(user);
      return { token, user };

    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },



 // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
   saveBook: async (parent, {input}, context) => {
    if(context.user){
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      )

      return updatedUser;
    };

    throw new AuthenticationError('You need to be logged in!');
  },
  // remove a book from `savedBooks`
  removeBook: async (parent, {bookId}, context) => {
    if(context.user){
    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { savedBooks: { bookId: bookId } } },
      { new: true }
    );

    return updatedUser;
  };

  throw new AuthenticationError('You need to be logged in!');
  },
  },
};

module.exports = resolvers;