import React from 'react';
import RoutesGuest from './RoutesGuest'
import RoutesUser from './RoutesUser'
import RoutesAdmin from './RoutesAdmin'


function RoutesCustom(props) {
    const setToken = props.setToken;
    const token = props.token;
    const isLoggedIn = props.isLoggedIn;
    const isAdmin = props.isAdmin;

    if (isLoggedIn && !isAdmin) {
        return <RoutesUser token={token} />;
    }else if(isLoggedIn && isAdmin) {
        return <RoutesAdmin token={token} />;
    }else{
        return <RoutesGuest setToken={setToken} />;
    }
}


export default RoutesCustom;

