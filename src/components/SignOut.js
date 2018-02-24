import React from 'react';

import {auth} from '../firebase';

const SignOutButton = (props) => {

    var roles = props.role;
    console.log('props,', roles)
    Object.keys(roles).map(key =>{
        console.log('value is .',roles[key])
        }

    );
    return (
        <div>
            <h2>  {props.email}</h2>
            {Object.keys(roles).map(key =>
                <div key={key}>
                    <h3>{key} : {roles[key].toString()}</h3>
                </div>
            )}


            <button
                type="button"
                onClick={auth.doSignOut}
            >
                Sign Out
            </button>
        </div>

    )
}


export default SignOutButton;