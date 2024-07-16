import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoursesService from '../../../service/courses.service';
import { Container, Row, Carousel, Col, Image } from 'react-bootstrap';
import './Home.css';
import Loader from '../../shared/Spinner/Loader';

import Hero from './Hero';
import Features from './Features';
import Banner from './Banner';

const Home = (props) => {
  const coursesService = new CoursesService();

  const [courses, setCourses] = useState(null);

  /*useEffect(() => {
    coursesService.getRandomCourses()
      .then(response => setCourses(response.data))
      .catch(() => {
        props.history.push('/courses');
        props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da');
      });
  }, []);*/

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero title='Aspire for more' p1='Learning keeps you in the lead.' p2='Get in-demand skills to impress anyone.' />

      <Features />



      <Banner title='Make the most of your online learning experience' text='Our teachers will help you learn while staying home.' />

      <section className="container-fluid about">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <Image style={{ width: '70%' }} src="https://i.ibb.co/KLRhr1L/Logo-for-Light-BG.png" />
            </Col>
            <Col md={6}>
              <h2 className="mb-3">About us</h2>
              <p>We Are Ascend IELTS, an online learning platform. We help organizations of all kinds prepare for the ever-evolving future of work.</p>
              <p>Connecting millions of students to the skills they need to succeed. We offer the opportunity to open access to education, especially for those whose opportunities have historically been limited. To do this, we’ve partnered with a number of organizations.</p>
            </Col>
          </Row>
        </Container>
      </section>
    </motion.div>
  );
};

export default Home;
