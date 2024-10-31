import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    variant = 'primary',
    size, 
    isDisabled = false, 
    isLoading = false, 
    onClick, 
    children,
    className // Accepting additional className prop
}) => {
    
    // Combine button classes with any additional className
    const buttonClass = `btn btn-${variant} ${size ? `btn-${size}` : ''} ${className || ''}`.trim();

    return (
        <button
            type="button"
            className={buttonClass} // Using the combined class string
            disabled={isDisabled || isLoading}
            onClick={onClick}
        >
            {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
            ) : (
                children
            )}
        </button>
    );
};

// Define prop types for the button
Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    size: PropTypes.oneOf(['sm', 'lg']), // Bootstrap sizes
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string, // Adding prop types for className
};

export default Button;
