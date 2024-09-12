const tf = require('@tensorflow/tfjs');
const userModel = require('../Models/Usermodel');
const jobdetails = require('../Models/jobModel');

// The tf.dot() function in TensorFlow.js is used to compute the dot product of two vectors or matrices. The dot product is a fundamental operation in linear algebra and is widely used in machine learning and data science, particularly for calculating similarity between two vectors, which is useful in various applications like recommendation systems, natural language processing, and computer vision.
//tf.norm() in TensorFlow.js is used to compute the norm (magnitude) of a tensor (vector or matrix). The norm is a measure of the "length" or "size" of the vector.
const cosineSimilarity = (A, B) => {
    const dotProduct = tf.dot(A, B);
    const magnitudeA = tf.norm(A);
    const magnitudeB = tf.norm(B);
    return dotProduct.div(magnitudeA.mul(magnitudeB));
};

const convertSkillsToVector = (allSkills, skills) => {
    return allSkills.map(skill => skills.includes(skill) ? 1 : 0);
};

const getJobRecommandations = async (req, resp) => {
    const { userid } = req.params;
    try {
        const findUser = await userModel.findOne({ 'user': userid });
        if (!findUser) throw new Error('User not found');

        const userSkills = findUser.skills;
        const jobs = await jobdetails.find();

        const allSkillsSet = new Set();

        jobs.forEach(job => job.keyskills.forEach(skill => allSkillsSet.add(skill)));
        userSkills.forEach(skill => allSkillsSet.add(skill));
        const allSkills = Array.from(allSkillsSet);

        const userSkillVector = tf.tensor1d(convertSkillsToVector(allSkills, userSkills));

        const recommendations = jobs.map(job => {
            const jobSkillVector = tf.tensor1d(convertSkillsToVector(allSkills, job.keyskills));
            const similarity = cosineSimilarity(userSkillVector, jobSkillVector).arraySync();

            return { job, similarity };
        });

        recommendations.sort((a, b) => b.similarity - a.similarity);
        //This code snippet filters the recommendations array to only include items (recommendations) whose similarity score is greater than or equal to a defined threshold (THRESHOLD).
        const THRESHOLD = 0.1;
        const filteredRecommendations = recommendations.filter(recommendation => recommendation.similarity >= THRESHOLD);

        if (filteredRecommendations.length === 0) {
            return resp.status(200).send('No recommendations found');
        }

        const jobRecommandUser = filteredRecommendations.slice(0, 5).map(recommendation => recommendation.job);

        resp.status(200).send(jobRecommandUser);
    } catch (error) {
        console.error('Error occurred getting the job recommendation for the user:', error.message);
        return resp.status(500).send('Error occurred while getting job recommendations for the user.');
    }
};

module.exports = getJobRecommandations;
