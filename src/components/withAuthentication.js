import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebase} from '../firebase';


const withAuthentication = (AuthComponent) => {
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            }
        }

        getChildContext() {
            console.log('get child context,',this.state)
            return {
                authUser: this.state.authUser,
            }
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                console.log('authentication authuser:',authUser)
                authUser
                    ? this.setState(() => ({authUser}))
                    : this.setState(() => ({authUser: null}));
            })
        }

        render() {
            return (
                <AuthComponent/>
            )
        }
    }

    WithAuthentication.childContextTypes = {
        authUser: PropTypes.object,
    };

    return WithAuthentication;
}

export default withAuthentication;