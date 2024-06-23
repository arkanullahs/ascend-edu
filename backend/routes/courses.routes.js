const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');

router.get('/sampleCourses', (req, res) => {
    Course.aggregate([{ $sample: { size: 8 } }])
        .then(response => res.json(response))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/getAllCourses', (req, res) => {
    Course.find()
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: err.message });
        });

});

router.get('/getOneCourse/:id', (req, res) => {
    Course.findById(req.params.id)
        .populate('owner')
        .then(course => {
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }
            res.json(course);
        })
        .catch(err => {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: err.message });
        });
});
router.get('/count', async (req, res) => {
    try {
        const count = await Course.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
