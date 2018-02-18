import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';
import UploadPage from './UploadPage';
import UploadFreePage from './UploadFreeImagesPage';
import FreeImagesPage from './FreeImagesPage';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import PaidImagesPage from './PaidImagesPage';
import AccountPage from './Account';
import LandingPage from './LandingPage';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
        <div>
            <Navigation />

            <hr/>
            <Route exact path={routes.LANDING} component={() => <LandingPage />}/>
            <Route exact path={routes.UPLOADFREE} component={() => <UploadFreePage />} {...this.props} />
            <Route exact path={routes.UPLOAD} component={() => <UploadPage />}/>
            <Route exact path={routes.FREE_IMAGES} component={() => <FreeImagesPage />}/>
            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
            <Route exact path={routes.PAID_IMAGES} component={() => <PaidImagesPage />}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);