import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

/**
 * A reusable card component with customizable content.
 * @param {string} title - The title of the card.
 * @param {string} content - The content text of the card.
 * @param {string} image - The URL of the image for the card.
 * @param {string} footer - The footer text or element of the card.
 * @returns A styled card component.
 */
const Card = ({ title, content, image, footer }) => {
    return (
        <div className="card">
            {image && <img src={image} alt={title} className="card-image" />}
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-content">{content}</p>
            </div>
            {footer && <div className="card-footer">{footer}</div>}
        </div>
    );
};

// Define prop types for the card
Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    footer: PropTypes.string,
};

export default Card;
