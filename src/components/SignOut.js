import React from 'react';

import { auth } from '../firebase';

const SignOutButton = (props) =>{
    console.log('props,',props)
    return(
        <button
            type="button"
            onClick={auth.doSignOut}
        >
            {props.email.email}
            Sign Out
        </button>
    )
}


export default SignOutButton;