// Reson.js
import React from 'react';
import Heading from '../../components/Typography/Heading1'; // Ensure this path is correct
import OurProductApp from '../../assets/images/Product_Management_Playbook_2x.webp';
import { Container, Row, Col } from 'react-bootstrap';

function Reson() {
    return (
        <section className='manage-section' >
            <Container>
                <Row className="align-items-center">
                    <Col md={7}>
                        <Heading 
                            level={3} 
                            text="Why Use This System" 
                        />
                        <p className='text-justify'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                        </p>
                    </Col>
                    <Col md={4}>
                        <img src={OurProductApp} alt="product" className='img-fluid w-75 circular-animation rounded-circle' />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Reson;
