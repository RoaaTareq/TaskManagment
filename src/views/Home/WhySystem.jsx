import React, { memo } from 'react';
import Heading from '../../components/Typography/Heading1';
import Image from '../../components/Image/Images'; 
import OurProductApp from '../../assets/images/Product_Management_Playbook_2x.webp';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const Reson = () => {
    const { t } = useTranslation();
    return (
        <section className='section-padding'>
            <Container>
                <Row className="align-items-center">
                    <Col md={7}>
                        <Heading level={3} text={t('why-system')} />
                        <p className='text-direction'>
                           {t('system-text')}
                        </p>
                    </Col>
                    <Col md={5}> 
                        <Image 
                            src={OurProductApp} 
                            alt="Product Management App" 
                            className="w-75 circular-animation rounded-circle"
                            responsive 
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default memo(Reson);
