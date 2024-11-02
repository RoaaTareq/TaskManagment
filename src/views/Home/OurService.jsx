
import React, { memo } from 'react';
import Card from '../../components/Card/Card'; 
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../../components/Typography/Heading1';
import { useTranslation } from 'react-i18next';
const Service = ({ services }) => {
    const { t } = useTranslation();
    return (
        <section className='section-padding'>
            <Container>
            <Heading level={2} text={t('service')} className="text-center" />
        
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
