import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';

import withAuthorization from '../components/withAuthorization';
import {db} from '../firebase/firebase';
import ImageItem from '../components/ImageItem';
import withRoot from '../components/withRoot';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        width: '100%',
        // height: 430,
        minHeight: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        // height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },


});
class ImagesListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            birthdayImages: null,
            holidayImages: null,
            weddingImages: null,
            otherImages: null,
            images: null,
            error: false,

            christmasCards: null,
            newYearCards: null,
            easterCards: null,

        };
    }

    getImages = (category = 'cards', imageType = 'christmas') => {
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                return db.ref().child(`${category}/${imageType}`).once("value", function (snapshot) {
                    console.log('snap shot is ',snapshot)
                    resolve(snapshot.val())

                });


            }, 500);
        });
    }
    fetchImages = (category, cardType) => {
        console.log('fetch is called!!!!!!!')
        var self = this;
        return new Promise(function (resolve, reject) {
            // some async operation here
            setTimeout(function () {
                // resolve the promise with some value
                self.getImages(category,cardType).then(function (images) {
                    console.log('images is called!!!!!!!',images)
                    resolve(images)
                    // self.setState({[cardType]: images});

                });


            }, 500);
        });
    }

    componentDidMount() {
        console.log('Home is mounted!!!!!!!!!!')
        var self = this;
        //
        Promise.all([this.fetchImages('cards', 'christmas'), this.fetchImages('cards', 'newYear'), this.fetchImages('cards', 'easter')])
            .then(function (results) {
                let christmasCards = results[0][0];
                let newYearCards = results[1][0];
                let easterCards = results[2][0];
                // let latestotherImages = results[3][0];
                let latestImages = [];
                latestImages.push(christmasCards, newYearCards, easterCards);
                console.log('christmasCards return', christmasCards)

                self.setState(
                    {
                        christmasCards: results[0],
                        newYearCards: results[1],
                        easterCards: results[2],

                    });
                // do something with result1 and result2
                // available as results[0] and results[1] respectively
            })
            .catch(function (err) { /* ... */
            });


    }

    render() {
        const {classes} = this.props;
        // console.log('classes props', classes)
        const {christmasCards,newYearCards,easterCards} = this.state;
        console.log('christmasCards', christmasCards)
        return (
            <div>

                <h1>Free Images from storage</h1>
                <p>Images :</p>
                <div>
                    {!!christmasCards &&
                    <ImagesList category="cards" type="christmas" images={christmasCards} classes={classes}/>}
                </div>
                <div>
                    {!!newYearCards &&
                    <ImagesList category="cards" type="newYear" images={newYearCards} classes={classes}/>}
                </div>
                <div>
                    {!!easterCards &&
                    <ImagesList category="cards" type="easter" images={easterCards} classes={classes}/>}
                </div>

            </div>
        );
    }
}


const ImagesList = ({images, category, type, classes}) => {

    // const { classes } = this.props;
    console.log('images', images, 'category ', category);
    if (images) {
        return (
            <div>
                <h2>List of {category} - {type} images in databse</h2>
                <p>(Save on Sign up in Firebase Database)</p>

                {Object.keys(images).map(key =>
                    <div key={key}>

                        <ul>
                            <li>
                                <ImageItem category={category} type={type} pic={images[key].downloadUrl}
                                           fileName={images[key].name}
                                           imageId={key}/>

                            </li>

                        </ul>

                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div><h2>NO IMAGES</h2></div>
        )
    }

}


const authCondition = (authUser) => !!authUser;


ImagesListPage = withRoot(withStyles(styles)(ImagesListPage));
export default withAuthorization(authCondition)(ImagesListPage);