const userModel = require('../Models/Usermodel')

const userData = async (req, resp) => {
    const { userid } = req.params;
    const { name, age, gender, location, education, experience, careerGoals, skills } = req.body;

    try {
        if (!req.file || !req.file.filename) {
            return resp.status(400).json({ message: "Profile picture is required" });
        }

        const createUserDetails = new userModel({
            user: userid,
            name,
            age,
            gender,
            profile: req.file.filename,
            location,
            education,
            experience,
            careerGoals,
            skills,
        });

        await createUserDetails.save();
        resp.status(200).json({ message: "User details successfully uploaded" });
    } catch (error) {
        console.error(error.message);
        resp.status(500).json({ message: "An error occurred while saving user details", error: error.message });
    }
};


const getUserDetails = async (req, resp) => {
    const { userid } = req.params
    try {
        const findUser = await userModel.find({ 'user': userid }).populate({ path: 'user', select: 'email role' })
        resp.send(findUser);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { userData, getUserDetails }