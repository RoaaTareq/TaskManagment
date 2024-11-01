import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../../components/Typography/Heading1'; // Ensure this path is correct
import Manage from '../../assets/images/UI_Illo__Workspace_Views_2x.webp';

const Management = () => {
    return (
        <section className='section-padding'>
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img 
                            src={Manage} 
                            alt="Illustration of a workspace management system" 
                            className='w-75 h-auto d-flex' 
                            loading="lazy" 
                        />
                    </Col>
                    <Col md={6}>
                        <Heading level={3} text="Why Use This System" />
                        <p className='text-direction'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat consequuntur eum illo doloremque impedit, accusantium nobis aspernatur, aliquid, et voluptatibus aliquam officia accusamus! Sit illum ipsam culpa modi ex.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default memo(Management); 
