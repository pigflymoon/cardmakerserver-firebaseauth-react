import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';

import UploadHolidayCardsPage from '../screens/UploadHolidayCardsPage';
import UploadBirthdayCardsPage from '../screens/UploadBirthdayCardsPage';
import UploadThankYouCardsPage from '../screens/UploadThankYouCardsPage';

import UploadHolidayInvitationsPage from '../screens/UploadHolidayInvitationsPage';
import UploadBirthdayInvitationsPage from '../screens/UploadBirthdayInvitationsPage';
import UploadWeddingInvitationsPage from '../screens/UploadWeddingInvitationsPage';

import SignUpPage from '../screens/SignUp';
import SignInPage from '../screens/SignIn';
import PasswordForgetPage from '../components/PasswordForget';
import AccountPage from '../screens/Account';
import ImagesListPage from '../screens/DeleteImages';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
        <div>
            <Navigation />

            <hr/>
            <Route exact path={routes.DATABASE} component={() => <ImagesListPage />} {...this.props} />
            <Route exact path={routes.UPLOADHOLIDAYCARDS} component={() => <UploadHolidayCardsPage />}/>
            <Route exact path={routes.UPLOADBIRTHDAYCARDS} component={() => <UploadBirthdayCardsPage />}/>
            <Route exact path={routes.UPLOADTHANKYOUCARDS} component={() => <UploadThankYouCardsPage/>}/>

            <Route exact path={routes.UPLOADHOLIDAYINVITATIONS} component={()=><UploadHolidayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADBIRTHDAYINVITATIONS} component={()=><UploadBirthdayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADWEDDINGINVITATIONS} component={()=><UploadWeddingInvitationsPage/>}/>


            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);