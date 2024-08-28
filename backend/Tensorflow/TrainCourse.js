const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');

async function loadModel() {
    const modelPath = path.join(__dirname, '../model/model.json');
    console.log(modelPath);
    const modelJson = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
    const modelWeights = JSON.parse(fs.readFileSync(path.join(__dirname, '../model/group1-shard1of1.bin')));

    const model = await tf.loadLayersModel(tf.io.fromMemory(modelJson, modelWeights));
    return model;
}

async function predictRecommendations(model, skillVector) {
    const inputTensor = tf.tensor2d([skillVector], [1, skillVector.length]);
    const predictions = model.predict(inputTensor);
    const predictionsArray = await predictions.array(); 
    return predictionsArray[0]; 
}

module.exports = {
    loadModel,
    predictRecommendations,
};
