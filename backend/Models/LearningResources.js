const mongoose = require('mongoose');

const learningResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: String, required: true }, // Example: 'course', 'book', 'tutorial'
    tags: [{ type: String }], // Example: ['JavaScript', 'Web Development']
    relatedSkills: [{ type: String }] // Skills related to this resource
}, { timestamps: true });

const LearningResource = mongoose.model('LearningResource', learningResourceSchema);

module.exports = LearningResource;
