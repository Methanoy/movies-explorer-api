const userRouter = require('express').Router();
const { updateUserProfile, getCurrentUserData } = require('../controllers/user');

userRouter.patch('/me', updateUserProfile);
userRouter.get('/me', getCurrentUserData);

module.exports = userRouter;
