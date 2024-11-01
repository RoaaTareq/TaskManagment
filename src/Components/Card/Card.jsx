// Card.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = ({ title, content, image, footer }) => {
    return (
        <BootstrapCard className="custom-card">
            {image && <BootstrapCard.Img src={image} alt={title} className="icon-card" />} 
            <BootstrapCard.Body>
                <BootstrapCard.Title>{title}</BootstrapCard.Title>
                <BootstrapCard.Text className="text-justify">{content}</BootstrapCard.Text> 
            </BootstrapCard.Body>
            {footer && <BootstrapCard.Footer>{footer}</BootstrapCard.Footer>} 
        </BootstrapCard>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    footer: PropTypes.string,
};

export default Card;
