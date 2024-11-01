import React from 'react';
import Select from '../../../../components/DropDown/Select'; 
import Input from '../../../../components/Input/Input'; 

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
                            <button className='filter-btn' onClick={() => handlePriorityChange('high')}>High</button>
                            <button className='filter-btn' onClick={() => handlePriorityChange('medium')}>Medium</button>
                            <button className='filter-btn' onClick={() => handlePriorityChange('low')}>Low</button>
                            <button className='filter-btn' onClick={() => handlePriorityChange('')}>All</button>
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
