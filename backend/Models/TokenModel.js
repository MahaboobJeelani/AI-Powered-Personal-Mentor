const mongoose = require('mongoose')

const TokenSchma = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'registration', unique: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } //1 hour
})

const tokenModel = mongoose.model('verifytoken', TokenSchma)

module.exports = tokenModel;