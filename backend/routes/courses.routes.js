const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/course.model');
const User = require('../models/user.model');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const courses = await Course.find().select('-videos');
    res.send(courses);
});

router.get('/teacher', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).send('Access denied.');
    const courses = await Course.find({ teacher: req.user._id });
    res.send(courses);
});

router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).send('Access denied.');
    }

    const course = new Course({
        ...req.body,
        teacher: req.user._id
    });

    try {
        await course.save();
        res.send(course);
    } catch (error) {
        res.status(500).send('Error creating course.');
    }
});

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
// Delete a course
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') {
        return res.status(403).send('Access denied.');
    }

    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found.');
        }

        if (course.teacher.toString() !== req.user._id) {
            return res.status(403).send('You are not authorized to delete this course.');
        }

        await course.remove();
        res.send({ message: 'Course deleted successfully.' });
    } catch (error) {
        res.status(500).send('Error deleting course.');
    }
});


module.exports = router;