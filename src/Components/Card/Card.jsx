import React from 'react';
import PropTypes from 'prop-types';


const Card = ({ title, content, image, footer }) => {
    return (
        <div className="card">
            {image && <img src={image} alt={title} className="card-img-top" />} 
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{content}</p> 
            </div>
            {footer && <div className="card-footer">{footer}</div>} 
        </div>
    );
};


Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    footer: PropTypes.string,
};

export default Card;
