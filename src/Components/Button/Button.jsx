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
    className 
}) => {
    
    
    return (
        <BootstrapButton
            type="submit" 
            variant={variant} 
            size={size} 
            disabled={isDisabled || isLoading} 
            onClick={onClick}
            className={className} 
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


Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    size: PropTypes.oneOf(['sm', 'lg']),
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string, 
};

export default Button;
