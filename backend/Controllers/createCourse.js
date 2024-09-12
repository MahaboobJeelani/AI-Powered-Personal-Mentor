const courseModel = require('../Models/LearningResources');

const createCourse = async (req, resp) => {
    try {
        const course = new courseModel(req.body);
        if(!course) resp.status(400).send('Course is unable to create')
        await course.save();
        resp.status(201).json({ message: "Course created successfully" })
    } catch (error) {
        resp.status(500).send("Error while creating the course", error.message)
    }
}



module.exports = createCourse
