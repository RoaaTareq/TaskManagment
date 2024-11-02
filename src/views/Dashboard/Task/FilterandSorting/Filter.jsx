import React from 'react';
import Input from '../../../../components/Input/Input'; 
import Button from '../../../../components/Button/Button'; // Import the reusable Button
import '../../../../assets/style/customcomponents.css'
const Filter = ({ setFilterPriority, setStartDate, setEndDate, startDate, endDate }) => {
    const handlePriorityChange = (priority) => {
        setFilterPriority(priority); // Set the priority filter based on button click
    };

    return (
        <section>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-6'>
                        <div className="d-flex align-items-center mt-4 mb-4">
                            <Button className='filter-btn' onClick={() => handlePriorityChange('High')}>High</Button>
                            <Button className='filter-btn' onClick={() => handlePriorityChange('Medium')}>Medium</Button>
                            <Button className='filter-btn' onClick={() => handlePriorityChange('Low')}>Low</Button>
                            <Button className='filter-btn' onClick={() => handlePriorityChange('')}>All</Button>
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className="d-flex align-items-center">
                            <label className='label-form'>Start Date:</label>
                            <Input
                                type="date"
                                name="startDate"
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                className='mr-2'
                            />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className='d-flex align-items-center'>
                            <label className='label-form'>End Date:</label>
                            <Input
                                type="date"
                                name="endDate"
                                value={endDate || ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                className='ml-2'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filter;
