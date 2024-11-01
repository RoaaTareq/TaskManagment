import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../../components/Typography/Heading1';
import Image from '../../components/Image/Images'; 
import '../../assets/style/home.css';
import Button from '../../components/Button/Button';
import MainImage from '../../assets/video/ai-service-management-platform.png';

const TopSection = () => {
    return (
        <section className='Main_section'>
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Heading 
                            level={1} 
                            text="Welcome to My Website, Start Organizing Tasks with a Smooth Experience" 
                            className="text-white" 
                        />
                        <Button className='mt-4 mb-4 btn_registe'>
                            Register Now!
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Image
                            src={MainImage}
                            alt="AI Service Management Platform"
                            className="main_img"
                            responsive 
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default memo(TopSection);
