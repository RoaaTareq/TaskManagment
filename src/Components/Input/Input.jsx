// Input.js
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
    type = 'text', 
    placeholder = '',
    value,
    name, // Add the name prop
    onChange,
}) => {
    return (
        <input
            type={type}
            className="form-control mt-2 mb-2" 
            placeholder={placeholder}
            value={value}
            name={name} // Add the name attribute here
            onChange={onChange}
        />
    );
};

// Define prop types for the input
Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, // Ensure it's defined in prop types
    onChange: PropTypes.func.isRequired,
};

export default Input;
