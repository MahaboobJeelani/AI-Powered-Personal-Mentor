const courseModel = require('../Models/LearningResources')

const addCourse = async (req, resp) => {

    try {
        const addCourseDetails = new courseModel(req.body)
        await addCourseDetails.save();
        resp.status(200).json({ message: "course data created" })
    } catch (error) {
        resp.status(500).send(error.message)
    }
}

module.exports = addCourse