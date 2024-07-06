import React from 'react';
import { useHistory } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const history = useHistory();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">The All-in-One Online Course Platform</h1>
          <p className="hero-subtitle">Launch your own education empire in minutes.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => history.push('/signup')}>Start Teaching Today</button>
            <button className="btn btn-secondary" onClick={() => history.push('/courses')}>View All Courses</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://i.ibb.co/xM3yDXZ/hero.gif" alt="hero" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
