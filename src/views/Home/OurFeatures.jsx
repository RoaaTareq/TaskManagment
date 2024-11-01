import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card'; 
import style from '../../assets/style/feature.module.css';

function Features({ features }) {
    return (
        <section className={style.features}>
            <Container>
                <h2 className="text-center">Our Features</h2>
                <Row className="d-flex">
                    {features.map((feature, index) => (
                        <Col md={4} key={index}>
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
}

export default Features;
