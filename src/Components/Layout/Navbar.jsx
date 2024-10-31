import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'; 

const Navbar = ({ brand, links, bgColor = 'light' }) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-${bgColor} bg-${bgColor}`}>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    {brand}
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto"> {/* Align links to the right */}
                        {links.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};


Navbar.propTypes = {
    brand: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
    bgColor: PropTypes.oneOf(['light', 'dark']),
};

export default Navbar;
