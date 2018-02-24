import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {firebase} from '../firebase';


const withAuthentication = (AuthComponent) => {
    class WithAuthentication extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
                userrole: null,
            }
        }

        getChildContext() {
            console.log('get child context,', this.state)
            return {
                authUser:{
                    user: this.state.authUser,
                    role: this.state.userrole,
                }

            }
        }

        componentDidMount() {

            firebase.auth.onAuthStateChanged(authUser => {
                var userId = firebase.auth.currentUser.uid, self = this;
                console.log('current userid,', userId);
                firebase.db.ref('/users/' + userId).once('value').then(function (snapshot) {
                    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
                    var userrole = (snapshot.val() && snapshot.val().role) || 'free_user';
                    console.log('username is: ', username, 'role is: ', userrole)
                    authUser
                        ? self.setState(() => ({authUser, userrole: userrole}))
                        : self.setState(() => ({authUser: null}));
                    // ...
                });

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
        userrole: PropTypes.object,
    };

    return WithAuthentication;
}

export default withAuthentication;