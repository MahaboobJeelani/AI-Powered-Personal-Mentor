const jobdetails = require('../Models/jobModel')

const createJob = async (req, resp) => {
    try {
        const jobdetail = new jobdetails(req.body)
        await jobdetail.save();
        resp.status(200).send('Job created successfully')
    } catch (error) {
        resp.status(500).json({ message: "Error while creating the job Details", error: error.message })
    }
}

module.exports = createJob