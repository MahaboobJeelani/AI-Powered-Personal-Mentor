const userModel = require('../Models/Usermodel')
const predictCareerPath = require('../Services/ModelsPredict');


const getCareerAdvice = async (req, res) => {
    const { id } = req.params;

    try {
        const findUser = await userModel.findById(id);
        console.log(id, findUser);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const predictedCareerPath = await predictCareerPath(findUser.skills);

        res.status(200).json({
            user: findUser.name,
            skills: findUser.skills,
            careerAdvice: predictedCareerPath
        });
    } catch (error) {
        console.error('An error occurred while fetching career advice:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching career advice' });
    }
};

module.exports = getCareerAdvice
