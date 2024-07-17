import React, { useState } from 'react';

const CourseForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        title: '',
        description: '',
        category: '',
        difficultyLevel: '',
        price: '',
        duration: '',
        videos: []
    });

    const [videoInput, setVideoInput] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleVideoChange = (e) => {
        setVideoInput(e.target.value);
    };

    const addVideo = () => {
        if (videoInput.trim()) {
            setFormData({ ...formData, videos: [...formData.videos, videoInput.trim()] });
            setVideoInput('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
            <input name="difficultyLevel" value={formData.difficultyLevel} onChange={handleChange} placeholder="Difficulty Level" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <input name="duration" type="number" value={formData.duration} onChange={handleChange} placeholder="Duration (in hours)" required />
            <input name="videoInput" value={videoInput} onChange={handleVideoChange} placeholder="Video Link" />
            <button type="button" onClick={addVideo}>Add Video</button>
            <ul>
                {formData.videos.map((video, index) => (
                    <li key={index}>{video}</li>
                ))}
            </ul>
            <button type="submit">{initialData ? 'Update Course' : 'Add Course'}</button>
        </form>
    );
};

export default CourseForm;
