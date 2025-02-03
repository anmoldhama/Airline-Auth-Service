const express = require('express');

const Usercontroller = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');

const router = express.Router();

router.post('/signup',
    AuthRequestValidators.validateUserAuth,
    Usercontroller.create);

router.post('/signIn',
    AuthRequestValidators.validateUserAuth,
    Usercontroller.signIn);

router.get('/isAuthenticated',
     Usercontroller.isAuthenticated);

router.get('/isAdmin',
    AuthRequestValidators.validateisAdminUser,
     Usercontroller.isAdmin);

module.exports = router;


