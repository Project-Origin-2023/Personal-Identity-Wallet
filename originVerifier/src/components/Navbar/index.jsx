import React from 'react';
import NavbarGuest from './NavbarGuest'
import NavbarUser from './NavbarUser'


function Navbar(props) {
    const isLoggedIn = props.isLoggedIn;
    const setToken = props.setToken
    
    if (isLoggedIn )
        return <NavbarUser setToken={setToken} />;
    return <NavbarGuest/>;
}


export default Navbar;

