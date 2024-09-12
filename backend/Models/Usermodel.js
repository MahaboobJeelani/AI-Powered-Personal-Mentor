const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'registration', required: true },
    name: { type: String, required: true },
    age: { type: Number, min: 0, max: 120 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    profile: { type: String, required: true },
    resume: { type: String, default: null },
    location: { type: String },
    education: { type: String },
    experience: { type: Number, min: 0 },
    careerGoals: [{ type: String }],
    careerPath: [{ type: String }],
    industry: { type: String },
    skills: [{ type: String, required: true }],
}, { timestamps: true });

const userModel = mongoose.model('userdata', userSchema);

module.exports = userModel;
