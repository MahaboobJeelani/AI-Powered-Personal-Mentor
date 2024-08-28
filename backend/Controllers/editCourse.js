const courseModel = require('../Models/LearningResources');

const editCourse = async (req, resp) => {
    try {
        const updatedCourse = await courseModel.findByIdAndUpdate(req.params.id, { '$set': req.body }, { new: true });

        if (!updatedCourse) {
            return resp.status(404).json({ message: "Course not found" });
        }

        resp.status(200).json({ message: "Course updated successfully", updatedCourse });
    } catch (error) {
        resp.status(500).json({ error: `Error while modifying course: ${error.message}` });
    }
}

module.exports = editCourse;
