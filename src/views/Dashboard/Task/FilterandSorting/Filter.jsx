import React from 'react';
import Input from '../../../../components/Input/Input'; 
import Button from '../../../../components/Button/Button';
import { Container, Row, Col } from 'react-bootstrap'; 
import '../../../../assets/style/customcomponents.css';
import { useTranslation } from 'react-i18next';

const Filter = React.memo(({ setFilterPriority, setStartDate, setEndDate, startDate, endDate }) => {
    
    const { t } = useTranslation();
    const handlePriorityChange = (priority) => {
        setFilterPriority(priority); 
    };

    const handleReset = () => {
        setFilterPriority(''); 
        setStartDate('');     
        setEndDate('');      
    };

    return (
        <section>
            <Container>
                <Row className='align-items-center'>
                    <Col xl={6} md={12} xs={12}>
                        <div className="d-flex align-items-center mt-4 mb-4 mobile-direction">
                            {[t('heigh'), t('meduim'), t('low')].map(priority => (
                                <Button 
                                    key={priority} 
                                    className='filter-btn' 
                                    onClick={() => handlePriorityChange(priority)}
                                >
                                    {priority}
                                </Button>
                            ))}
                            <Button 
                                className='filter-btn' 
                                onClick={() => handlePriorityChange('')}
                            >
                                {t('all')}
                            </Button>
                            
                            <Button 
                                className='reset-button' 
                                onClick={handleReset} 
                                variant="light" // Optional for better styling
                            >
                                🔄️
                            </Button>
                        </div>
                    </Col>
                    <Col xl={3} md={12} xs={12} >
                        <div className="d-flex align-items-center">
                            <label htmlFor="startDate" className='label-form'>{t('start_date')}:</label>
                            <Input
                                type="date"
                                name="startDate"
                                id="startDate" 
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                className='ms-2' // Change to Bootstrap 5 spacing
                            />
                        </div>
                    </Col>
                    <Col xl={3} md={12} xs={12}>
                        <div className='d-flex align-items-center'>
                            <label htmlFor="endDate" className='label-form'>{t('end_date')}:</label>
                            <Input
                                type="date"
                                name="endDate"
                                id="endDate" 
                                value={endDate || ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                className='ms-2' // Change to Bootstrap 5 spacing
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
});

export default Filter;
