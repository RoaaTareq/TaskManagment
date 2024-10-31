import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
    variant = 'primary',
    size, 
    isDisabled = false, 
    isLoading = false, 
    onClick, 
    children,
}) => {
    
    const buttonClass = `btn btn-${variant} ${size ? `btn-${size}` : ''}`;

    return (
        <button
            type="button"
            className={buttonClass}
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
};

export default Button;
