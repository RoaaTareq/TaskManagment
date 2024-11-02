import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = ({ brand, links, bgColor = 'light' }) => {
    return (
        <BootstrapNavbar bg={bgColor} variant={bgColor} expand="lg" className="sticky-top">
            <Container>
                <Link className="navbar-brand" to="/">
                    {brand}
                </Link>
                <BootstrapNavbar.Toggle aria-controls="navbarNav" />
                <BootstrapNavbar.Collapse id="navbarNav">
                    <Nav className="ms-auto align-items-center"> 
                        {links.map((link, index) => (
                            <Nav.Item key={index}>
                                {link.onClick ? (
                                    <button
                                        onClick={link.onClick}
                                        className="nav-link btn btn-link"
                                        style={{ padding: 0, border: 'none', background: 'none', color: 'inherit' }}
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link className="nav-link" to={link.href}>
                                        {link.label}
                                    </Link>
                                )}
                            </Nav.Item>
                        ))}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

Navbar.propTypes = {
    brand: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string,
            onClick: PropTypes.func 
        })
    ).isRequired,
    bgColor: PropTypes.oneOf(['light', 'dark']),
};

export default Navbar;
