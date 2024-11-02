import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const Input = ({
    type = 'text', 
    placeholder = '',
    value,
    name, 
    onChange,
}) => {
    return (
        <Form.Control
            type={type}
            className="mt-2 mb-2" 
            placeholder={placeholder}
            value={value}
            name={name} 
            onChange={onChange}
        />
    );
};


Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired,
};

export default Input;
