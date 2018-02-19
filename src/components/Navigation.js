import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, {authUser}) => {

    if(authUser){
        console.log('auth user is, ', authUser.email)
    }
    return (
        <div>
            { authUser
                ? <NavigationAuth email={authUser.email} />
                : <NavigationNonAuth />
            }
        </div>
    )
}


Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = (authUser) =>{
    console.log('authuser is ',authUser)
    return(
        <ul>
            <li><Link to={routes.UPLOADFREE}>Upload for free user</Link></li>
            <li><Link to={routes.UPLOADPAID}>Upload for paid user</Link></li>
            <li><Link to={routes.FREE_IMAGES}>Free images list</Link></li>
            <li><Link to={routes.PAID_IMAGES}>Paid images list</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton email={authUser} /></li>
        </ul>
    )
}


const NavigationNonAuth = () =>
    <ul>
        <li><Link to={routes.LANDING}>Welcome</Link></li>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Navigation;