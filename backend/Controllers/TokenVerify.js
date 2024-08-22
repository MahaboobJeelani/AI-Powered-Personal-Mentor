const RegistrationModel = require('../Models/RegistrationModel')
const TokenModel = require('../Models/TokenModel')

const tokenVerification = async (req, resp) => {
    const { id, token } = req.params
    try {
        const findUser = await RegistrationModel.findById(id)

        if (!findUser) resp.status(400).send({ message: 'invalid link' })

        const findToken = await TokenModel.findOne({
            userid: findUser._id,
            token: token
        })

        if (!findToken) resp.status(400).send({ message: 'invalid link' })

        await RegistrationModel.findByIdAndUpdate(findUser._id, { isVerified: true })
        await TokenModel.deleteOne({ _id: findToken._id });

        resp.status(200).send({ message: "Email verified successfully" })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = tokenVerification