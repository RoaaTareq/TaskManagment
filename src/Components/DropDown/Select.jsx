import React from 'react';
import PropTypes from 'prop-types';



const Select = ({ options, value, onChange, placeholder = 'Select an option', isDisabled = false }) => {
    return (
        <select
            className="form-select" 
            value={value}
            onChange={onChange}
            disabled={isDisabled}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};


Select.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
};

export default Select;
