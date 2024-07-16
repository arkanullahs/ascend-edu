const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/course.model');
const User = require('../models/user.model');
const router = express.Router();

// Get all courses
router.get('/', auth, async (req, res) => {
    const courses = await Course.find().select('-videos');
    res.send(courses);
});

// Get teacher's courses
router.get('/teacher', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).send('Access denied.');
    const courses = await Course.find({ teacher: req.user._id });
    res.send(courses);
});

// Create a new course
router.post('/', auth, async (req, res) => {
    console.log('Request to create course by user:', req.user);

    if (req.user.role !== 'teacher') {
        console.log('Access denied. User is not a teacher.');
        return res.status(403).send('Access denied.');
    }

    const course = new Course({
        ...req.body,
        teacher: req.user._id
    });

    try {
        await course.save();
        console.log('Course created successfully:', course);
        res.send(course);
    } catch (error) {
        console.log('Error creating course:', error.message);
        res.status(500).send('Error creating course.');
    }
});

// Update a course
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).send('Access denied.');

    const course = await Course.findOneAndUpdate(
        { _id: req.params.id, teacher: req.user._id },
        req.body,
        { new: true }
    );

    if (!course) return res.status(404).send('Course not found or you are not authorized to edit this course.');

    res.send(course);
});

// Enroll in a course
router.post('/:id/enroll', auth, async (req, res) => {
    if (req.user.role !== 'student') return res.status(403).send('Access denied.');

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found.');

    if (course.enrolledStudents.includes(req.user._id)) {
        return res.status(400).send('You are already enrolled in this course.');
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    const user = await User.findById(req.user._id);
    user.enrolledCourses.push(course._id);
    await user.save();

    res.send('Enrolled successfully.');
});

// Get course details (including videos if enrolled)
router.get('/:id', auth, async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found.');

    const isEnrolled = course.enrolledStudents.includes(req.user._id);
    const isTeacher = course.teacher.toString() === req.user._id;

    if (!isEnrolled && !isTeacher) {
        const { videos, ...courseData } = course.toObject();
        return res.send(courseData);
    }

    res.send(course);
});

module.exports = router;