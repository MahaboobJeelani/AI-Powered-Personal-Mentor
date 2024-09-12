const User = require('../Models/Usermodel');
const LearningResource = require('../Models/LearningResources');
const { loadModel, predictRecommendations } = require('../Tensorflow/TrainCourse');

function convertSkillsToVector(skills) {
    const allSkills = ["react js", "node js", "machine learning", "javascript", "python"];
    return allSkills.map(skill => skills.includes(skill) ? 1 : 0);
}

async function getLearningRecommendations(req, res) {
    try {
        const { userid } = req.params;

        const user = await User.findOne({ "user": userid }).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const skillVector = convertSkillsToVector(user.skills);

        const model = await loadModel();

        const predictions = await predictRecommendations(model, skillVector);

        const resources = await LearningResource.find().exec();

        const recommendedResources = resources.filter(resource => {
            return resource.relatedSkills.some(skill => predictions.includes(skill));
        });

        res.status(200).json(recommendedResources);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting recommendations' });
    }
}

module.exports = getLearningRecommendations
