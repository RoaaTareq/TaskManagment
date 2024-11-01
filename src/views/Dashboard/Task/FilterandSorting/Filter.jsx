import React, { useState } from 'react';
import Select from '../../../../components/DropDown/Select'; 
import Input from '../../../../components/Input/Input'; 

const Filter = ({ onFilterChange }) => {
    const [selectedPriority, setSelectedPriority] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const priorityOptions = [
        { label: 'All', value: '' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    const handlePriorityChange = (e) => {
        const value = e.target.value;
        setSelectedPriority(value);
        onFilterChange({ priority: value, startDate, endDate });
    };

    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
        onFilterChange({ priority: selectedPriority, startDate: value, endDate });
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
        onFilterChange({ priority: selectedPriority, startDate, endDate: value });
    };

    const handleResetFilters = () => {
        setSelectedPriority('');
        setStartDate('');
        setEndDate('');
        onFilterChange({ priority: '', startDate: '', endDate: '' }); // Reset to show all tasks
    };

    return (
        <section>
            <div className='container'>
                
                <div className='row align-items-center '>
                    <div  className='col-3'>
                       <div className="d-flex align-items-center">
                       <label className='label-form'>Priority:</label>
                        <Select
                            options={priorityOptions}
                            value={selectedPriority}
                            onChange={handlePriorityChange}
                            placeholder="Select priority"
                            className='mr-2'
                        />
                       </div>
                    </div>
                    <div className='col-3'>
                       <div className="d-flex align-items-center">
                       <label className='label-form'>Start Date:</label>
                        <Input
                            type="date"
                            value={startDate}
                            name="startDate" // Add name for input
                            onChange={handleStartDateChange}
                            className='mr-2'
                        />
                       </div>
                    </div>
                    <div className='col-3'>
                       <div className='d-flex align-items-center'>
                       <label className='label-form'>End Date:</label>
                        <Input
                            type="date"
                            value={endDate}
                            name="endDate" // Add name for input
                            onChange={handleEndDateChange}
                            className='ml-2'
                        />
                       </div>
                    </div>
                    {/* <button onClick={handleResetFilters}>Clear Filters</button> */}
                </div>
            </div>
        </section>
    );
};

export default Filter;
