import React from 'react';
import PropTypes from 'prop-types';


const Heading = ({ level, text, className }) => {
  
    const HeadingTag = `h${level}`;

    return (
        <HeadingTag className={`heading ${className}`}>
            {text}
        </HeadingTag>
    );
};


Heading.propTypes = {
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), 
    text: PropTypes.string.isRequired, 
    className: PropTypes.string,
};


Heading.defaultProps = {
    level: 1, 
    className: '', 
};

export default Heading;
