// Sidebar.js
import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ brand, menuItems, onPin, onClose }) => {
    return (
        <div className="sidebar d-flex flex-column align-items-start p-3 border-end sidebar-bg">
            <h3 className="text-white mb-3">{brand}</h3>
            <Nav className="flex-column w-100">
                {menuItems.map((item, index) => (
                    <Nav.Link href={item.link} key={index} className="nav-link text-white">
                        {item.label}
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

Sidebar.propTypes = {
    brand: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })
    ).isRequired,
    onPin: PropTypes.func,
    onClose: PropTypes.func,
};

Sidebar.defaultProps = {
    
    onPin: () => console.log('Pinned'),
    onClose: () => console.log('Closed'),
};

export default Sidebar;
