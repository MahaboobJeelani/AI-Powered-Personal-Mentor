const mongoose = require('mongoose')

const RegistrationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const RegistrationModel = mongoose.model('registration', RegistrationSchema)

module.exports = RegistrationModel;