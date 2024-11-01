// Image.js
import React from 'react';
import PropTypes from 'prop-types';
import { Image as BootstrapImage } from 'react-bootstrap';

const Image = ({ src, alt, className = '', rounded = false, responsive = false }) => {
    const imgClass = `${className} ${rounded ? 'rounded' : ''} ${responsive ? 'img-fluid' : ''}`;

    return (
        <BootstrapImage
            src={src}
            alt={alt}
            className={imgClass}
            fluid={responsive} // Use Bootstrap's fluid prop for responsive images
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
