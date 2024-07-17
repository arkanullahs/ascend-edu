import React from 'react';
import { useHistory } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const history = useHistory();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">বাংলাদেশ শিখবে,লাইভে!</h1>
          <p className="hero-subtitle">স্কিল শেখার মাধ্যমে বদলে ফেলুন নিজের ভবিষ্যৎ</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => history.push('/student-dashboard')}>শেখা শুরু করুন</button>
            <button className="btn btn-secondary" onClick={() => history.push('/signup')}>শেখানো শুরু করুন</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://cdn.ostad.app/public/upload/2024-02-18T10-44-42.948Z-2dsdss.webp" alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
