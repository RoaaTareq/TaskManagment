import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card'; 


const Features = ({ features }) => {
    return (
        <section className='section-padding '>
            <Container>
                <h2 className="text-center">Our Features</h2>
                <Row className="d-flex">
                    {features.map((feature) => (
                        <Col md={4} key={feature.id || feature.title}> 
                            <Card 
                                title={feature.title}
                                content={feature.content}
                                image={feature.image}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default memo(Features); 