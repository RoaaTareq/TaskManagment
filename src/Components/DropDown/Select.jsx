import React from 'react';
import PropTypes from 'prop-types';
import './Select.css';  // Import CSS for styling

/**
 * A reusable select component with customizable styles.
 * @param {array} options - An array of options for the dropdown (e.g., [{label: 'Option 1', value: '1'}, ...]).
 * @param {string} value - The currently selected value.
 * @param {function} onChange - Function to handle selection change.
 * @param {string} placeholder - Placeholder text for the select field.
 * @param {boolean} isDisabled - Disables the select field if true.
 * @returns A styled select component.
 */
const Select = ({ options, value, onChange, placeholder = 'Select an option', isDisabled = false }) => {
    return (
        <select
            className="select"
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

// Define prop types for the select component
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
