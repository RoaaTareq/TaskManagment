import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ brand, links, bgColor = 'light' }) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light sticky-top navbar-${bgColor} bg-${bgColor}`}>
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
                    <ul className="navbar-nav ms-auto align-items-center"> {/* Align links to the right */}
                        {links.map((link, index) => (
                            <li className="nav-item" key={index}>
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
            href: PropTypes.string,
            onClick: PropTypes.func // Allow for optional onClick function
        })
    ).isRequired,
    bgColor: PropTypes.oneOf(['light', 'dark']),
};

export default Navbar;
