const express = require('express');
const authRoute = express();

const authController = require('../controllers/auth.controller');
const weatherController = require('../controllers/weather.controller');

//Auth 

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login)


module.exports = authRoute;