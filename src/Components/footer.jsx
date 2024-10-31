import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

/**
 * A reusable footer component with customizable content.
 * @param {string} copyright - The copyright text.
 * @param {array} links - An array of link objects for navigation.
 * @param {array} socialLinks - An array of social media link objects.
 * @returns A styled footer component.
 */
const Footer = ({ copyright, links, socialLinks }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    {links && links.map((link, index) => (
                        <a key={index} href={link.href} className="footer-link">
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="footer-social-links">
                    {socialLinks && socialLinks.map((link, index) => (
                        <a key={index} href={link.href} className="footer-social-link" target="_blank" rel="noopener noreferrer">
                            <img src={link.icon} alt={link.label} className="social-icon" />
                        </a>
                    ))}
                </div>
            </div>
            <div className="footer-copyright">
                <p>{copyright}</p>
            </div>
        </footer>
    );
};

// Define prop types for the footer component
Footer.propTypes = {
    copyright: PropTypes.string,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ),
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })
    ),
};

export default Footer;
