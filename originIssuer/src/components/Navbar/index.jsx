import React from 'react';
import NavbarGuest from './NavbarGuest'
import NavbarUser from './NavbarUser'
import NavbarAdmin from './NavbarAdmin'


function Navbar(props) {
    const isLoggedIn = props.isLoggedIn;
    const isAdmin = props.isAdmin
    const setToken = props.setToken
    
    if (isLoggedIn && !isAdmin) {
        return <NavbarUser setToken={setToken} />;
    }else if (isLoggedIn && isAdmin) {
        return <NavbarAdmin setToken={setToken} />;
    }

    return <NavbarGuest/>;
}


export default Navbar;

