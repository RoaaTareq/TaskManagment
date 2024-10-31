// Image.js
import React from 'react';
import PropTypes from 'prop-types';


const Image = ({ src, alt, className = '', rounded = false, responsive = false }) => {
    const imgClass = `${responsive ? 'img-fluid' : ''} ${rounded ? 'rounded' : ''} ${className}`;
    
    return (
        <img
            src={src}
            alt={alt}
            className={imgClass}
        />
    );
};

// Define prop types for the Image component
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    rounded: PropTypes.bool,
    responsive: PropTypes.bool,
};

export default Image;
