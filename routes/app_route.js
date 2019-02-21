var express=require('express');
//var multer=require('multer');
var router=express.Router();

var signup_controller=require('../controllers/app_controller.js');

router.get('/test',signup_controller.test);
router.post('/signup_create',signup_controller.signup_create);
router.post('/signup_login',signup_controller.signup_login);

router.post('/signup_social',signup_controller.signup_social);

module.exports=router;