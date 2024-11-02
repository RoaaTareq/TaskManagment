import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import style from '../../assets/style/banner.module.css';
import Button from '../../components/Button/Button';
import Heading from '../../components/Typography/Heading1';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/sign-up');
    };
    return (
        <section className={`section-padding ${style.banner}`}>
            <Container>
                <Row>
                    <Col className="text-center">
                    <Heading level={2} text={t('start')} className='mt-4 mb-4 text-white'  />
                      
                        <Button className={`mt-4 mb-4 ${style.btn_register}`} onClick={handleRegister}>
                        {t('registernow')}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default React.memo(Banner);
