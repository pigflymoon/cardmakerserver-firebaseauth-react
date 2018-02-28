import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = (props, {authUser}) => {

    if(authUser.user){
        console.log('auth user userrole is?????????, ',authUser)
    }
    return (//这里的传的props会在一个大的对象里 role and email
        <div>
            { authUser.user
                ? <NavigationAuth  role={authUser.role}  email={authUser.user.email}  />
                : <NavigationNonAuth />
            }
        </div>
    )
}


Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = (userAndrole) =>{
    console.log('userAndrole is ',userAndrole,'userAndrole.email',userAndrole.email)
    return(
        <ul>
            <li><Link to={routes.STORAGE}>Images list</Link></li>
            <li><Link to={routes.UPLOADFREE}>Upload for free user</Link></li>
            <li><Link to={routes.UPLOADPAID}>Upload for paid user</Link></li>
            <li><Link to={routes.FREE_IMAGES}>Free images list</Link></li>
            <li><Link to={routes.PAID_IMAGES}>Paid images list</Link></li>
            <li><Link to={routes.ACCOUNT}>Account</Link></li>
            <li><SignOutButton email={userAndrole.email} role={userAndrole.role}  /></li>
        </ul>
    )
}


const NavigationNonAuth = () =>
    <ul>
        <li><Link to={routes.LANDING}>Welcome</Link></li>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
    </ul>

export default Navigation;