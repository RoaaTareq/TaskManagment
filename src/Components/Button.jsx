import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';  // Import CSS for styling

const Button = ({
    variant = 'primary',
    size,
    isDisabled = false,
    isLoading = false,
    onClick,
    children,
}) => {
    return (
        <button
            type="button"
            className={`button ${variant} ${size ? `button-${size}` : ''}`}
            disabled={isDisabled || isLoading}
            onClick={onClick}
        >
            {isLoading ? (
                <span className="button-spinner"></span> // Show loading spinner
            ) : (
                children
            )}
        </button>
    );
};

// Define prop types for the button
Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
    size: PropTypes.oneOf(['small', 'large']),
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

export default Button;
