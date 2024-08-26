// TrainModel.js
const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs');
const userModel = require('../Models/Usermodel');

const trainModel = async () => {
    try {
        const users = await userModel.find({});

        // Define specific skills and career paths
        const allSkills = ["react js", "node js", "machine learning"];
        const allCareerPaths = ["Frontend Developer", "Backend Developer", "AI"];

        const careerPathIndexMap = allCareerPaths.reduce((map, path, index) => {
            map[path] = index;
            return map;
        }, {});

        const featureVectors = [];
        const labels = [];

        users.forEach(user => {
            const featureVector = new Array(allSkills.length).fill(0);
            user.skills.forEach(skill => {
                const index = allSkills.indexOf(skill.toLowerCase().trim());
                if (index !== -1) {
                    featureVector[index] = 1;
                }
            });

            featureVectors.push(featureVector);

            const label = new Array(allCareerPaths.length).fill(0);
            user.careerGoals.forEach(goal => {
                if (careerPathIndexMap[goal] !== undefined) {
                    label[careerPathIndexMap[goal]] = 1;
                }
            });
            labels.push(label);
        });

        const inputTensor = tf.tensor2d(featureVectors);
        const outputTensor = tf.tensor2d(labels);

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [allSkills.length] }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dense({ units: allCareerPaths.length, activation: 'softmax' }));

        model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

        await model.fit(inputTensor, outputTensor, {
            epochs: 200,
            validationSplit: 0.2,
            shuffle: true
        });

        return model;
    } catch (error) {
        console.error('Error occurred while training the model:', error.message);
    }
};

module.exports = { trainModel };
