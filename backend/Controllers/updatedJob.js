const jobdetails = require('../Models/jobModel')
// const { findByIdAndUpdate } = require('../Models/RegistrationModel')


const editJob = async (req, resp) => {
    try {
        const editJob = await jobdetails.findByIdAndUpdate(req.params._id, { $set: req.body }, { new: true, runValidators: true });
        if (!editJob) return resp.status(404).send("job details not found")
        resp.status(200).json({ message: "updated successfully" })
    } catch (error) {
        resp.status(500).json({ message: 'Error occured while updating the job details', error: error.message })
    }
}


const getSingleJob = async (req, resp) => {
    try {
        const getSingleData = await jobdetails.findById(req.params.jobid);
        if (!getSingleData) return resp.status(404).send('Job details not found')
        resp.status(200).json(getSingleData)
    } catch (error) {
        resp.status(500).send("Error getting single data", error.message)
    }
}



module.exports = { editJob, getSingleJob }