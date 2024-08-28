const { Registration, login } = require('../Controllers/RegistrationCont')
const tokenVerification = require('../Controllers/TokenVerify')
const { userData, getUserDetails } = require('../Controllers/UserCont')
const upload = require('../Middlewares/FileUploader')
const getCareerAdvice = require('../Controllers/CareerAdvice')
const editUser = require('../Controllers/EditUser')
const getLearningRecommendations = require('../Controllers/getLearningRecommendations')
const SourceRecommand = require('../Controllers/SourceRecommand');
const addCourse = require('../Controllers/courseRecom')
const editCourse = require('../Controllers/editCourse')


const express = require('express')

const router = express.Router();

router.post('/register', Registration);
router.post('/login', login)
router.get('/:id/verify/:token', tokenVerification)
router.post('/editprofile/:id', upload, userData)
router.get('/profile/:userid', getUserDetails)
router.get('/career-advice/:userid', getCareerAdvice);
router.put('/edit-profile/:userid', editUser)
router.get('/career-advice/:userid', getLearningRecommendations)
router.get('/learning-recommand/:userid', SourceRecommand)
router.post('/addCourse', addCourse)
router.put('/editCourse/:id', editCourse)

module.exports = router;

