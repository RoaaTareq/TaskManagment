import React, { memo } from 'react';
import Heading from '../../components/Typography/Heading1';
import Image from '../../components/Image/Images'; 
import OurProductApp from '../../assets/images/Product_Management_Playbook_2x.webp';
import { Container, Row, Col } from 'react-bootstrap';

const Reson = () => {
    return (
        <section className='section-padding'>
            <Container>
                <Row className="align-items-center">
                    <Col md={7}>
                        <Heading level={3} text="Why Use This System" />
                        <p className='text-direction'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                        </p>
                    </Col>
                    <Col md={5}> 
                        <Image 
                            src={OurProductApp} 
                            alt="Product Management App" 
                            className="w-75 circular-animation rounded-circle"
                            responsive // Applies Bootstrap's img-fluid for responsiveness
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default memo(Reson);
