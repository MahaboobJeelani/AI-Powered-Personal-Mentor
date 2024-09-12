const RegistrationModel = require('../Models/RegistrationModel')
const jobdetails = require('../Models/jobModel')

const applyJob = async (req, resp) => {

    try {
        const findAdmin = await RegistrationModel.findById(req.params.mentorid)
        if (!findAdmin) return resp.status(404).send('Mentor Not Found')

        const jobDetails = await jobdetails.findById(req.params.jobid)
        if (!jobDetails) return resp.status(404).send('jobDetails Not Found')

        const existJob = findAdmin.jobdetail.some(job => job.toString() === jobDetails._id.toString())
        if (existJob) return resp.status(200).send("Already applyed for this job postion")

        findAdmin.jobdetail.push(jobDetails._id)
        await findAdmin.save();

        resp.send(findAdmin)
    } catch (error) {
        resp.status(500).send(error.message)
    }
}

module.exports = { applyJob }