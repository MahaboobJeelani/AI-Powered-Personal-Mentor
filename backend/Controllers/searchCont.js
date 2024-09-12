const jobdetails = require('../Models/jobModel')

const searchJob = async (req, resp) => {
    try {
        const { location, skills, company, experience } = req.body

        let query = {}
        if (location) query.location = location

        if (skills) {
            const skillsData = skills.map(skill => skill.trim())
            query.keyskills = { "$in": skillsData }
        }

        if (company) query.company = company

        if (experience) query.experience = experience

        const jobs = await jobdetails.find(query)

        if (jobs.length === 0) {
            return resp.status(200).send(" No jobs found for this search")
        }


        resp.status(200).json(jobs)


    } catch (error) {
        resp.status(500).send(error.message)
    }
}

module.exports = searchJob