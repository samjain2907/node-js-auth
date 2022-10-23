const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();      // creating a new instance of the router class

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/signup', authController.login_post);
router.get('/logout', authController.logout_get);


// since we are using the MVC approach we will be implementing the functions inside the authControl file.

module.exports = router;