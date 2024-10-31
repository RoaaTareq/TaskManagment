import React from 'react';
import PropTypes from 'prop-types';

// Heading component
const Heading = ({ level, text, className }) => {
    // Determine the correct heading tag based on the level prop
    const HeadingTag = `h${level}`;

    return (
        <HeadingTag className={`heading ${className}`}>
            {text}
        </HeadingTag>
    );
};

// Define prop types for the heading component
Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), // Heading level from 1 to 6
    text: PropTypes.string.isRequired, // Text for the heading
    className: PropTypes.string, // Additional class names for custom styles
};

// Default props
Heading.defaultProps = {
    level: 1, // Default heading level
    className: '', // Default to no additional class
};

export default Heading;
