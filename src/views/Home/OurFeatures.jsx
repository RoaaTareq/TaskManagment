import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card'; 
import Heading from '../../components/Typography/Heading1';
import { useTranslation } from 'react-i18next';
const Features = ({ features }) => {
    const { t } = useTranslation();
    return (
        <section className='section-padding '>
            <Container>
            <Heading level={2} text={t('ourfeatures')} className="text-center" />
               
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