import React from 'react';
import PropTypes from 'prop-types';



const Footer = ({ copyright, links, socialLinks }) => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="d-flex justify-content-between mb-3">
                    <div className="footer-links">
                        {links && links.map((link, index) => (
                            <a key={index} href={link.href} className="text-light me-3">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="footer-social-links">
                        {socialLinks && socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="me-3 text-light"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={link.icon} alt={link.label} className="social-icon" style={{ width: '24px', height: '24px' }} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <p className="mb-0">{copyright}</p>
                </div>
            </div>
        </footer>
    );
};

// Define prop types for the footer component
Footer.propTypes = {
    copyright: PropTypes.string.isRequired,
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
