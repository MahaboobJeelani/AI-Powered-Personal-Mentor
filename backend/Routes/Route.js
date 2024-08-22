const { Registration, login } = require('../Controllers/RegistrationCont')
const tokenVerification = require('../Controllers/TokenVerify')
const { userData, getUserDetails } = require('../Controllers/UserCont')
const upload = require('../Middlewares/FileUploader')
const getCareerAdvice = require('../Controllers/CareerAdvice')

const express = require('express')


const router = express.Router();

router.post('/register', Registration);
router.post('/login', login)
router.get('/:id/verify/:token', tokenVerification)
router.post('/editprofile/:id', upload, userData)
router.get('/profile/:userid', getUserDetails)
router.get('/career-advice/:id', getCareerAdvice);

module.exports = router;

