const express = require('express');
const {
  registeruser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUser,
  getAllUser,
} = require('../Controllers/userControllers');
const isAuthenticated = require('../Middlewares/isAuthenticated');
const userRouter = new express.Router();

const multer = require('multer');
const { storage } = require('../utils/configCloudinary');
const upload = multer({ storage: storage });

//getUser
userRouter.get('/v1/user/:query', getUser);
//getAllUser
userRouter.get('/v1/users', getAllUser);
//signup
userRouter.post('/v1/signup', registeruser);
//login
userRouter.post('/v1/login', loginUser);
//logout
userRouter.post('/v1/logout', logoutUser);
//folow/unfollow
userRouter.post('/v1/follow/:id', isAuthenticated, followUnfollowUser);
//updateUser
userRouter.put(
  '/v1/user/:id',
  isAuthenticated,
  upload.single('pfp'),
  updateUser
);

module.exports = userRouter;
