import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from '../../assets/style/banner.module.css';
import Button from '../../components/Button/Button';
import Heading from '../../components/Typography/Heading1';

const Banner = () => {
    return (
        <section className={`section-padding ${style.banner}`}>
            <Container>
                <Row>
                    <Col className="text-center">
                    <Heading level={2} text="Get started with Task Management System today"  className='mt-4 mb-4 text-white' />
                      
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
