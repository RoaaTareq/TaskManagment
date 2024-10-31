import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Input = ({
    type = 'text', 
    placeholder = '',
    value,
    isDisabled = false,
    onChange,
}) => {
    return (
        <input
            type={type}
            className="form-control" 
            placeholder={placeholder}
            value={value}
            disabled={isDisabled}
            onChange={onChange}
        />
    );
};

// Define prop types for the input
Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default Input;
