const tf = require('@tensorflow/tfjs');
const { trainModel } = require('./TrainModel');
const userModel = require('../Models/Usermodel');

const predictCareerPath = async (studentSkills) => {
    try {
        const model = await trainModel();

        const users = await userModel.find({});
        const allSkills = Array.from(new Set(users.flatMap(user => user.skills)));


        const skillIndexMap = {};
        allSkills.forEach((skill, index) => {
            skillIndexMap[skill] = index;
        });

        const featureVector = new Array(allSkills.length).fill(0);
        studentSkills.forEach(skill => {
            if (skillIndexMap[skill] !== undefined) {
                featureVector[skillIndexMap[skill]] = 1;
            }
        });

        const inputTensor = tf.tensor2d([featureVector]);

        const predictions = model.predict(inputTensor);
        const predictedIndex = predictions.argMax(-1).dataSync()[0];
        const predictedCareerPath = ["Software Engineer", "Machine Learning Engineer", "Data Scientist"][predictedIndex];

        return predictedCareerPath;
    } catch (error) {
        console.log('Error occurred while predicting the data:', error.message);
    }
};

module.exports = predictCareerPath;
