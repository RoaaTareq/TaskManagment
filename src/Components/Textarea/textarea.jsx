// Textarea.js
import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Textarea = ({
    name,
    value,
    onChange,
    placeholder = '',
    rows = 4,
    className = '',
    error, // For displaying validation error messages
}) => {
    return (
        <div className={`textarea-wrapper ${className}`}>
            <Form.Control
                as="textarea"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`form-control ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

// Define prop types for the Textarea component
Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.string,
};

export default Textarea;
