import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Features.css';

const Features = () => {
  const companyLogos = [
    {
      imgSrc: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
      alt: 'Google Logo',
    },
    {
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png',
      alt: 'Facebook Logo',
    },
    {
      imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      alt: 'Tesla Logo',
    },
    {
      imgSrc: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/da/BUET_LOGO.svg/180px-BUET_LOGO.svg.png',
      alt: 'BUET Logo',
    },
  ];

  const [coloredIndex, setColoredIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setColoredIndex((prevIndex) => (prevIndex + 1) % companyLogos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [companyLogos.length]);

  return (
    <section className="features py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h2 className="section-heading">Trusted by these companies</h2>
            <p className="sub-heading">Leading brands that trust our services</p>
          </Col>
          {companyLogos.map((company, index) => (
            <Col key={index} lg={2} md={3} sm={4} xs={6} className="mb-4">
              <img
                src={company.imgSrc}
                alt={company.alt}
                className={`company-logo ${index === coloredIndex ? 'colored' : ''}`}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
