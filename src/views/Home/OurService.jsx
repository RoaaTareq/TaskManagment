// Service.js
import React from 'react';
import Card from '../../components/Card/Card'; 
import { Container, Row, Col } from 'react-bootstrap';
import style from '../../assets/style/service.module.css';

const Service = ({ services }) => {
    return (
        <section className={style.service}>
            <Container>
                <h2 className="text-center">Our Services</h2>
                <Row className="d-flex">
                    {services.map((service, index) => (
                        <Col md={4} key={index}> {/* Use Col md={4} for three cards on medium screens */}
                            <Card 
                                title={service.title}
                                content={service.content}
                                image={service.image}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Service;
