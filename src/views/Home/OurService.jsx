
import React, { memo } from 'react';
import Card from '../../components/Card/Card'; 
import { Container, Row, Col } from 'react-bootstrap';


const Service = ({ services }) => {
    return (
        <section className='section-padding'>
            <Container>
                <h2 className="text-center">Our Services</h2>
                <Row className="d-flex">
                    {services.map((service, index) => (
                        <Col md={4} key={service.id || index}> 
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

export default memo(Service); 
