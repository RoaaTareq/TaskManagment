import React from 'react';
import Input from '../../../../components/Input/Input'; 
import Button from '../../../../components/Button/Button';
import { Container, Row, Col } from 'react-bootstrap'; 
import '../../../../assets/style/customcomponents.css';

const Filter = React.memo(({ setFilterPriority, setStartDate, setEndDate, startDate, endDate }) => {
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
                            {['High', 'Medium', 'Low'].map(priority => (
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
                                All
                            </Button>
                            
                            <span 
                                className='reset-button'
                                onClick={handleReset}
                            >
                                🔄️
                            </span>
                        </div>
                    </Col>
                    <Col xl={3} md={12} xs={12} >
                        <div className="d-flex align-items-center">
                            <label htmlFor="startDate" className='label-form'>Start Date:</label>
                            <Input
                                type="date"
                                name="startDate"
                                id="startDate" 
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                className='ml-2'
                            />
                        </div>
                    </Col>
                    <Col xl={3} md={12} xs={12}>
                        <div className='d-flex align-items-center'>
                            <label htmlFor="endDate" className='label-form'>End Date:</label>
                            <Input
                                type="date"
                                name="endDate"
                                id="endDate" 
                                value={endDate || ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                className='ml-2'
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
});

export default Filter;
