const { register, login, logout, current, forgotPassword, changePassword, update } = require('../controllers/auth');
const { validateBody, checkAuth, uploadAvatar } = require('../middleware');
const { schemaUserRegister, schemaUserLogin, schemaForgotPassword, schemaChangePassword } = require('../modules/User');
const route = require('express').Router();

//Regsiter
route.post('/register', validateBody(schemaUserRegister), register);

//Login
route.post('/login', validateBody(schemaUserLogin), login);

//Logout
route.post('/logout', checkAuth, logout);

//Current 
route.get('/current', checkAuth, current);

//Forgot password
route.post('/forgot-password', validateBody(schemaForgotPassword), forgotPassword);

//Change password 
route.patch('/change-password', checkAuth, validateBody(schemaChangePassword), changePassword);

//Update user 
route.patch('/update', checkAuth, uploadAvatar.single('avatar'), update);


module.exports = route