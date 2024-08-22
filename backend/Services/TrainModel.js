const userModel = require('../Models/Usermodel');
const tf = require('@tensorflow/tfjs');


const trainModel = async () => {
    try {
        const users = await userModel.find({});

        const allSkills = Array.from(new Set(users.flatMap(user => user.skills)));
        const allCareerPaths = ["Software Engineer", "Machine Learning Engineer", "Data Scientist"];

        const careerPathIndexMap = {};
        allCareerPaths.forEach((path, index) => {
            careerPathIndexMap[path] = index;
        });

        const featureVectors = [];
        const labels = [];

        users.forEach(user => {
            const featureVector = new Array(allSkills.length).fill(0);

            user.skills.forEach(skill => {
                const index = allSkills.indexOf(skill);
                if (index !== -1) {
                    featureVector[index] = 1;
                }
            });

            featureVectors.push(featureVector);

            const label = new Array(allCareerPaths.length).fill(0);
            if (user.careerPath.length > 0) {
                user.careerPath.forEach(path => {
                    if (careerPathIndexMap[path] !== undefined) {
                        label[careerPathIndexMap[path]] = 1;
                    }
                });
            }
            labels.push(label);
        });

        const inputTensor = tf.tensor2d(featureVectors);
        const outputTensor = tf.tensor2d(labels);

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [allSkills.length] }));
        model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
        model.add(tf.layers.dense({ units: allCareerPaths.length, activation: 'softmax' }));

        model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

    
        await model.fit(inputTensor, outputTensor, {
            epochs: 50,
            shuffle: true
        });

        return model;
    } catch (error) {
        console.error('Error occurred while training the model:', error.message);
    }
};

module.exports = { trainModel };
