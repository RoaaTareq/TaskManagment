import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from '../../assets/style/banner.module.css';
import Button from '../../components/Button/Button';

function Banner() {
    return (
        <section className={style.banner}>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h2 className='mt-4 mb-4 text-white'>Get started with Trello today</h2>
                        <Button className={`mt-4 mb-4 m-auto d-flex justify-content-center ${style.btn_register}`}>
                            Register Now!
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Banner;
