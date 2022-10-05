const userRouter = require('express').Router();
const { updateUserProfile, getCurrentUserData } = require('../controllers/user');
const { validateUpdateUserProfile } = require('../middlewares/inputDataValidation');

userRouter.patch('/me', validateUpdateUserProfile, updateUserProfile);
userRouter.get('/me', getCurrentUserData);

module.exports = userRouter;
