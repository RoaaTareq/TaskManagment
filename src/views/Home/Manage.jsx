// Management.js
import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Heading from '../../components/Typography/Heading1';
import Image from '../../components/Image/Images'; 
import Manage from '../../assets/images/UI_Illo__Workspace_Views_2x.webp';
import { useTranslation } from 'react-i18next';
const Management = () => {
    const { t } = useTranslation();
    return (
        <section className='section-padding manage-section'>
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <Image
                            src={Manage}
                            alt="Illustration of a workspace management system"
                            className="w-75 h-auto d-flex"
                            responsive 
                            rounded   
                        />
                    </Col>
                    <Col md={6}>
                        <Heading level={3} text={t('why')} />
                        <p className='text-direction'>
                          {t('text-why')}
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default memo(Management);
