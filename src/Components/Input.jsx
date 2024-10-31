import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';  // Import CSS for styling

/**
 * A reusable input component with customizable styles.
 * @param {string} type - The input type (e.g., 'text', 'email', 'password').
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The value of the input field.
 * @param {boolean} isDisabled - Disables the input field if true.
 * @param {function} onChange - Function to handle input value changes.
 * @returns A styled input component.
 */
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
            className="input"
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
