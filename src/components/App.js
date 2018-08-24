import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';

import UploadHolidayCardsPage from '../screens/cards/UploadHolidayCardsPage';
import UploadBirthdayCardsPage from '../screens/cards/UploadBirthdayCardsPage';
import UploadThankYouCardsPage from '../screens/cards/UploadThankYouCardsPage';

//Occasions
import UploadOccasionsCardsPage from '../screens/cards/UploadOccasionsCardsPage';



import UploadHolidayInvitationsPage from '../screens/invitations/UploadHolidayInvitationsPage';
import UploadBirthdayInvitationsPage from '../screens/invitations/UploadBirthdayInvitationsPage';
import UploadWeddingInvitationsPage from '../screens/invitations/UploadWeddingInvitationsPage';


import DeleteHolidayCardsPage from '../screens/delete/DeleteHolidayCardsPage';
import DeleteBirthdayCardsPage from '../screens/delete/DeleteBirthdayCardsPage';
import DeleteThankYouCardsPage from '../screens/delete/DeleteThankYouCardsPage';

import DeleteHolidayInvitationsPage from '../screens/delete/DeleteHolidayInvitationsPage';
import DeleteBirthdayInvitationsPage from '../screens/delete/DeleteBirthdayInvitationsPage';
import DeleteWeddingInvitationsPage from '../screens/delete/DeleteWeddingInvitationsPage';

import SignUpPage from '../screens/SignUp';
import SignInPage from '../screens/SignIn';
import PasswordForgetPage from '../components/PasswordForget';
import AccountPage from '../screens/Account';
import ImagesListPage from '../screens/DeleteImages';

import AllImagesPage from '../screens/AllImagesPage';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
        <div>
            <Navigation />

            <hr/>
            <Route exact path={routes.DATABASE} component={() => <ImagesListPage />} {...this.props} />

            <Route exact path={routes.ALLIMAGES} component={() => <AllImagesPage />}/>

            <Route exact path={routes.UPLOADHOLIDAYCARDS} component={() => <UploadHolidayCardsPage />}/>
            <Route exact path={routes.UPLOADBIRTHDAYCARDS} component={() => <UploadBirthdayCardsPage />}/>
            <Route exact path={routes.UPLOADTHANKYOUCARDS} component={() => <UploadThankYouCardsPage/>}/>

            <Route exact path={routes.UPLOADOCCASIONSCARDS} component={() => <UploadOccasionsCardsPage/>}/>




            <Route exact path={routes.UPLOADHOLIDAYINVITATIONS} component={()=><UploadHolidayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADBIRTHDAYINVITATIONS} component={()=><UploadBirthdayInvitationsPage/>}/>
            <Route exact path={routes.UPLOADWEDDINGINVITATIONS} component={()=><UploadWeddingInvitationsPage/>}/>


            <Route exact path={routes.DELETEHOLIDAYCARDS} component={() => <DeleteHolidayCardsPage />}/>
            <Route exact path={routes.DELETEBIRTHDAYCARDS} component={() => <DeleteBirthdayCardsPage />}/>
            <Route exact path={routes.DELETETHANKYOUCARDS} component={() => <DeleteThankYouCardsPage />}/>

            <Route exact path={routes.DELETEHOLIDAYINVITATIONS} component={() => <DeleteHolidayInvitationsPage />}/>
            <Route exact path={routes.DELETEBIRTHDAYINVITATIONS} component={() => <DeleteBirthdayInvitationsPage />}/>
            <Route exact path={routes.DELETEWEDDINGINVITATIONS} component={() => <DeleteWeddingInvitationsPage />}/>


            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);