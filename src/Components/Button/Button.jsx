// Button.js
import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

const Button = ({
    variant ,
    size, 
    isDisabled = false, 
    isLoading = false, 
    onClick, 
    children,
    className // Accepting additional className prop
}) => {
    
    // Use BootstrapButton for Bootstrap styling
    return (
        <BootstrapButton
            type="submit" // Change type to "submit"
            variant={variant} // Bootstrap variant
            size={size} // Bootstrap size
            disabled={isDisabled || isLoading} // Disable if loading or disabled
            onClick={onClick}
            className={className} // Allow additional className
        >
            {isLoading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                </>
            ) : (
                children
            )}
        </BootstrapButton>
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
