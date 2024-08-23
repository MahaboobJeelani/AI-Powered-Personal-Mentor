const userModel = require('../Models/Usermodel')

const editUser = async (req, resp) => {
    const { userid } = req.params
    const updateuserDetails = req.body
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { user: userid }, { $set: updateuserDetails }, { new: true, runValidators: true }
        )

        if (!updatedUser) {
            return resp.status(404).json({ message: 'User not found' });
        }

        resp.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log("Error occured while updated the user", error.message);
    }
}

module.exports = editUser;