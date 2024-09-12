
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
const createCourse = require('../Controllers/createCourse')
const deleteCourse = require('../Controllers/deleteCourse')
const uploadFile = require('../Controllers/uploadResume')
const createJob = require('../Controllers/createJob')
const { editJob, getSingleJob } = require('../Controllers/updatedJob')
const getJobRecommandations = require('../Controllers/Recommandation')
const searchJob = require('../Controllers/searchCont')
const chatWithAi = require('../Controllers/chatAi')
const { applyJob } = require('../Controllers/applyJob')

require('../SwaggerDocs/UserDocs')
const express = require('express')

const router = express.Router();


router.post('/register', Registration); // user
router.post('/login', login) // user
router.get('/:id/verify/:token', tokenVerification) // user
router.post('/editprofile/:id', upload, userData) // user
router.get('/profile/:userid', getUserDetails) // user
router.get('/career-advice/:userid', getCareerAdvice); // user
router.put('/edit-profile/:userid', editUser) // user
router.get('/career-advice/:userid', getLearningRecommendations)
router.get('/learning-recommand/:userid', SourceRecommand)
router.post('/addCourse', addCourse)
router.put('/editCourse/:id', editCourse); //mentor
router.post('/create-course', createCourse) // mentor
router.delete('/deletecourse/:_id', deleteCourse) // mentor
router.put('/upload-resume/:id', upload, uploadFile)
router.post('/createJob', createJob) // mentor
router.put('/editJob/:_id', editJob) // mentor
router.get('/jobrecommandation/:userid', getJobRecommandations)
router.get('/search', searchJob) // user and mentor
router.get('/singlejob/:jobid', getSingleJob)
router.get('/chat-with-ai', chatWithAi)
router.post('/applyjob/:mentorid/:jobid', applyJob)


module.exports = router;

