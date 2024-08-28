const User = require('../Models/Usermodel');
const predictCareerPath = require('../Tensorflow/ModelPredict');
const LearningResource = require('../Models/LearningResources');

const SourceRecommand = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await User.findOne({ "user": userid }).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const predictedCareerPath = await predictCareerPath(user.skills);
        // console.log(predictedCareerPath);

        const resources = await LearningResource.find().exec();
        // console.log(resources);

        const recommendedResources = resources.filter(resource =>
            resource.relatedSkills.some(skill => user.skills.includes(skill.toLowerCase())) ||
            resource.tags.some(tag => tag.toLowerCase().includes(predictedCareerPath.toLowerCase()))
        );
        console.log(predictedCareerPath);

        res.status(200).json({ recommendedResources });

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: 'Error getting recommendations' });
    }
};

module.exports = SourceRecommand;
