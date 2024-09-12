const courseModel = require('../Models/LearningResources');


const deleteCourse = async (req, resp) => {
    try {
        const findCourse = await courseModel.findById(req.params._id);
        if (!findCourse) return resp.status(404).send('Course not found')
        const deleteCourse = await courseModel.deleteOne(req.params)
        console.log(deleteCourse)
        if (deleteCourse.deletedCount === 0) return resp.status().send('Course is not deleted')
        resp.status(200).json({ deleteCourse, message: "course delete successfully" })
    } catch (error) {
        resp.status(500).send("Error occured while deleting the course")
    }
}

module.exports = deleteCourse