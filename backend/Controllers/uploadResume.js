const userModel = require('../Models/Usermodel')


const uploadFile = async (req, resp) => {
    // const { resume } = req.body
    try {
        const findUser = await userModel.findOneAndUpdate({ 'user': req.params.id }, { $set: { "resume": req.file.filename } }, { new: true, runValidators: true })
        if (!findUser) return resp.status(404).send("User not found")
        resp.status(200).json({ message: 'File uploaded successfully', findUser })
    } catch (error) {
        resp.status(500).send("error uploading the file", error.message)
    }
}

module.exports = uploadFile