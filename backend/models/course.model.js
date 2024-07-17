const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    videos: [{ type: String }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;