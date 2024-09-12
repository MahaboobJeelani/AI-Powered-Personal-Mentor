const mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required']
    },
    hrname: {
        type: String,
        required: [true, 'HR name is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    salary: {
        type: String,
        required: [true, 'Salary is required']
    },
    openings: {
        type: Number,
        required: [true, 'Number of openings is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience level is required']
    },
    role: {
        type: String,
        required: [true, 'Job role is required']
    },
    industrytype: {
        type: String,
        required: [true, 'Industry type is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    employmenttype: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'],
        required: [true, 'Employment type is required']
    },
    rolecategory: {
        type: String,
        required: [true, 'Role category is required']
    },
    educationlevel: {
        type: String,
        required: [true, 'Education level is required']
    },
    keyskills: [{
        type: String,
        required: [true, 'Key skills are required']
    }],
    jobstatus: {
        type: String,
        enum: ['Open', 'Closed', 'On Hold'],
        required: [true, 'Job status is required']
    }
}, { timestamps: true });

const jobdetails = mongoose.model('jobDetails', jobSchema);



module.exports = jobdetails;
