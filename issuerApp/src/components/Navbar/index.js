import React from 'react';
import PropTypes from 'prop-types';
import NavbarGuest from './NavbarGuest'
import NavbarUser from './NavbarUser'


function Navbar(props) {
    const isLoggedIn = props.isLoggedIn;
    const setToken = props.setToken
    if (isLoggedIn) {
        return <NavbarUser setToken={setToken} />;
    }
    return <NavbarGuest/>;
}

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setToken: PropTypes.func.isRequired,
};

export default Navbar;

