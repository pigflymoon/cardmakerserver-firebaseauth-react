import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './Navigation';
// import UploadPaidImagesPage from './UploadPaidImagesPage';
// import UploadFreePage from './UploadFreeImagesPage';
// import UploadImagesPage from './UploadImagesPage';
// import FreeImagesPage from './FreeImagesPage';
import UploadBirthdayPage from './UploadBirthdayPage';
// import UploadHolidayPage from './UploadHolidayPage';
// import UploadWeddingPage from './UploadWeddingPage';
// import UploadOthersPage from './UploadOthersPage';
import UploadCardsPage from './UploadCardsPage';
import UploadHolidayCardsPage from '../screens/UploadHolidayCardsPage';
import UploadBirthdayCardsPage from '../screens/UploadBirthdayCardsPage';
import UploadThankYouCardsPage from '../screens/UploadThankYouCardsPage';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
// import PaidImagesPage from './PaidImagesPage';
import AccountPage from './Account';
// import LandingPage from './LandingPage';
import ImagesListPage from './DeleteImages';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';

const App = () =>
    <Router>
        <div>
            <Navigation />

            <hr/>
            <Route exact path={routes.DATABASE} component={() => <ImagesListPage />} {...this.props} />
            <Route exact path={routes.UPLOADCARDS} component={() => <UploadCardsPage />}/>
            <Route exact path={routes.UPLOADHOLIDAYCARDS} component={() => <UploadHolidayCardsPage />}/>
            <Route exact path={routes.UPLOADBIRTHDAYCARDS} component={() => <UploadBirthdayCardsPage />}/>
            <Route exact path={routes.UPLOADTHANKYOUCARDS} component={() => <UploadThankYouCardsPage/>}/>
            <Route exact path={routes.UPLOADBIRTHDAY} component={() => <UploadBirthdayPage />}/>
            {/*<Route exact path={routes.UPLOADHOLIDAY} component={() => <UploadHolidayPage />}/>*/}
            {/*<Route exact path={routes.UPLOADWEDDING} component={() => <UploadWeddingPage />}/>*/}
            {/*<Route exact path={routes.UPLOADOTHERS} component={() => <UploadOthersPage />}/>*/}

            {/*<Route exact path={routes.UPLOADBIRTHDAY} component={() => <UploadBirthdayPage />}/>*/}

            {/*<Route exact path={routes.UPLOADBIRTHDAY} component={() => <UploadBirthdayPage />}/>*/}


            {/*<Route exact path={routes.LANDING} component={() => <LandingPage />}/>*/}

            {/*<Route exact path={routes.UPLOADIMAGES} component={() => <UploadImagesPage />}/>*/}
            {/*<Route exact path={routes.UPLOADFREE} component={() => <UploadFreePage />} {...this.props} />*/}
            {/*<Route exact path={routes.UPLOADPAID} component={() => <UploadPaidImagesPage />}/>*/}

            {/*<Route exact path={routes.FREE_IMAGES} component={() => <FreeImagesPage />}/>*/}

            <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}/>
            <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}/>
            <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />}/>
            {/*<Route exact path={routes.PAID_IMAGES} component={() => <PaidImagesPage />}/>*/}
            <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
    </Router>

export default withAuthentication(App);