import React from 'react';
import Select from '../../../../components/DropDown/Select'; 
import Input from '../../../../components/Input/Input'; 

const Filter = ({ setFilterPriority, setStartDate, setEndDate }) => {
    const priorityOptions = [
        { label: 'All', value: '' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    const handlePriorityChange = (selectedOption) => {
        setFilterPriority(selectedOption.value);
    };

    return (
        <section>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-3'>
                        <div className="d-flex align-items-center">
                            <label className='label-form'>Priority:</label>
                            <Select
                                options={priorityOptions}
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
                                name="startDate"
                                onChange={(e) => setStartDate(e.target.value)} // Set start date
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
                                onChange={(e) => setEndDate(e.target.value)} // Set end date
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
