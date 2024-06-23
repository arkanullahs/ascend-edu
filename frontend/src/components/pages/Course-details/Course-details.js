import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import CoursesService from './../../../service/courses.service'
import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap'
import './Course-details.css'


class CourseDetails extends Component {
    constructor() {
        super()
        this.state = {
            course: undefined,
            videoUrl: undefined,
            showModal: false
        }
        this.coursesService = new CoursesService()
    }

    componentDidMount = () => this.refreshCourse()

    refreshCourse = () => {
        const course_id = this.props.match.params.course_id
        const getCourse = this.coursesService.getCourse(course_id)

        Promise.all([getCourse])
            .then(res => this.setState({ course: res[0].data, videoUrl: res[0].data.videos[0] }))
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
            })
    }


    toggleInput = () => this.setState({ showInput: !this.state.showInput })

    setVideoUrl = url => this.setState({ videoUrl: url })

    render() {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <Container className="course-details ">
                    {this.state.course
                        ?
                        <>
                            <section className="header">
                                <Row>
                                    <Col md={{ span: 8 }} >
                                        <h1>{this.state.course.title}</h1>
                                        <p><em> {this.state.course.lead}</em></p>

                                        { }
                                        <p><strong>Category:</strong> {this.state.course.category} | <strong>Difficulty Level:</strong>  {this.state.course.difficultyLevel} | <strong>Price:</strong>  {this.state.course.price} € | <strong>Duration:</strong>  {this.state.course.duration} hrs.</p>
                                    </Col>
                                    <Col md={{ span: 4 }} >
                                        <img className="mb-3 course-img" src={this.state.course.imageUrl} alt={this.state.course.title} />
                                    </Col>
                                </Row>
                            </section>

                            <section className="course-bckg">
                                <Row>
                                    <Col>
                                        <h3 className="mt-5 mb-3">Description</h3>
                                        <p>{this.state.course.description}</p>

                                        <h3 className="mt-5 mb-4">What you will learn:</h3>
                                        <ul className="whatYouWillLearn">
                                            {this.state.course.whatYouWillLearn.map((elm, idx) => <li key={idx}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607883391/project3-ironhack/checked_ib75gx.png" alt='Checked icon' /><p>{elm}</p></li>)}
                                        </ul>
                                        <h3 className="mt-4 mb-4">Requirements:</h3>
                                        <ul className="requirements mb-4">
                                            {this.state.course.requirements.map((elm, idx) => <li key={idx}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607887317/project3-ironhack/double-check_tm7qmy.png" alt='Double-Checked icon' /><p>{elm}</p></li>)}
                                        </ul>

                                        {
                                        }

                                        { }
                                        {this.state.showInput &&
                                            <motion.div transition={{ type: 'spring', stiffness: 300, duration: 1.2 }}>
                                                <Row>
                                                    <Col md={12} lg={8}>
                                                        <ReactPlayer
                                                            width='100%'
                                                            url={this.state.videoUrl}
                                                            controls
                                                        />
                                                    </Col>

                                                    <Col md={12} lg={4}>
                                                        {this.state.course.videos.map((elm, idx) =>
                                                            <Card.Header className="video-card" key={elm._id}>
                                                                <img
                                                                    src="https://res.cloudinary.com/dodneiokm/image/upload/v1607893554/project3-ironhack/play_u6mma0.png"
                                                                    alt="play icon"
                                                                    onClick={() => this.setVideoUrl(elm)}
                                                                />
                                                                <p style={{ display: 'inline-flex' }} >Lesson {idx + 1}</p>
                                                            </Card.Header>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </motion.div>}

                                    </Col>
                                </Row>
                            </section>


                            { }

                            {
                            }

                            <Link to="/courses" className="btn btn-sm btn-outline-dark mt-5">Go back</Link>
                        </>
                        :
                        <Loader />
                    }
                </Container>
            </motion.div>
        )
    }
}

export default CourseDetails
