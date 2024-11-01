// Footer.js
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = ({ copyright, links, socialLinks }) => {
    return (
        <footer className="footer-bg text-light py-2">
            <Container>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-between">
                        <Nav className="footer-links">
                            {links && links.map((link, index) => (
                                <Nav.Link key={index} href={link.href} className="text-light me-3">
                                    {link.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <div className="footer-social-links d-flex">
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
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="mb-0">{copyright}</p>
                    </Col>
                </Row>
            </Container>
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
