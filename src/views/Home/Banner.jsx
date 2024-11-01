
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from '../../assets/style/banner.module.css';
import Button from '../../components/Button/Button';

const Banner = () => {
    return (
        <section className={`section-padding ${style.banner}`}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h2 className='mt-4 mb-4 text-white'>Get started with Trello today</h2>
                        <Button className={`mt-4 mb-4 ${style.btn_register}`}>
                            Register Now!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default React.memo(Banner);
