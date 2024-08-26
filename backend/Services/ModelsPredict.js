// ModelPredict.js
const tf = require('@tensorflow/tfjs');
const { trainModel } = require('./TrainModel');

const predictCareerPath = async (studentSkills) => {
    try {
        const model = await trainModel();

        // Define skills and their corresponding career paths
        const allSkills = ["react js", "node js", "machine learning"];
        const careerPaths = ["Frontend Developer", "Backend Developer", "AI"];

        const skillIndexMap = {};
        allSkills.forEach((skill, index) => {
            skillIndexMap[skill] = index;
        });

        const featureVector = new Array(allSkills.length).fill(0);
        studentSkills.forEach(skill => {
            const normalizedSkill = skill.toLowerCase().trim();
            if (skillIndexMap[normalizedSkill] !== undefined) {
                featureVector[skillIndexMap[normalizedSkill]] = 1;
            }
        });

        const inputTensor = tf.tensor2d([featureVector]);

        const predictions = model.predict(inputTensor);
        const predictedIndex = predictions.argMax(-1).dataSync()[0];
        const predictedCareerPath = careerPaths[predictedIndex];

        return predictedCareerPath;
    } catch (error) {
        console.log('Error occurred while predicting the data:', error.message);
    }
};

module.exports = predictCareerPath;
