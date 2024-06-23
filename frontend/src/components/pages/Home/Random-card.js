import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import './Random-card.css';

const RandomCard = (props) => {
    return (
        <Col xs={12} sm={6} md={6} lg={6} xl={3} className="mb-4">
            <Link className="random-card-link" to={`/courses/${props._id}`}>
                <Card className="random-card">
                    <Card.Img variant="top" src={props.imageUrl} alt={props.title} />
                    <Card.Body>
                        <Card.Title className="random-title">{props.title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default RandomCard;
