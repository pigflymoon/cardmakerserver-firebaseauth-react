import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';

import withAuthorization from './withAuthorization';
import {db} from '../firebase';
import ImageItem from './ImageItem';
import withRoot from './withRoot';

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

        };
    }

    componentDidMount() {
        // console.log('Home is mounted')
        var self = this;

        db.onceGetBirthdayImages().then(snapshot => {
            if (snapshot) {
                self.setState(() => ({birthdayImages: snapshot.val()}));

            }
        }, function (error) {
            self.setState({error: true});
            // console.error('get images erros,', error);

        });

        db.onceGetHolidaydayImages().then(snapshot => {
            if (snapshot) {
                self.setState(() => ({holidayImages: snapshot.val()}));

            }
        }, function (error) {
            self.setState({error: true});
            // console.error('get images erros,', error);

        });


        db.onceGetWeddingImages().then(snapshot => {
            if (snapshot) {
                self.setState(() => ({weddingImages: snapshot.val()}));

            }
        }, function (error) {
            self.setState({error: true});
            // console.error('get images erros,', error);

        });
        db.onceGetOtherImages().then(snapshot => {
            if (snapshot) {
                self.setState(() => ({otherImages: snapshot.val()}));

            }
        }, function (error) {
            self.setState({error: true});
            // console.error('get images erros,', error);

        });

    }

    render() {
        const {classes} = this.props;
        // console.log('classes props', classes)
        const {birthdayImages, holidayImages,weddingImages,otherImages} = this.state;
        return (
            <div>

                <h1>Free Images from storage</h1>
                <p>Images :</p>
                <div>
                    {!!birthdayImages && <ImagesList type="birthday" images={birthdayImages} classes={classes}/>}
                </div>
                <div>
                    {!!holidayImages && <ImagesList type="holidays" images={holidayImages} classes={classes}/>}
                </div>
                <div>
                    {!!weddingImages && <ImagesList type="wedding" images={weddingImages} classes={classes}/>}
                </div>
                <div>
                    {!!otherImages && <ImagesList type="others" images={otherImages} classes={classes}/>}
                </div>

            </div>
        );
    }
}


const ImagesList = ({images, type, classes}) => {

    // const { classes } = this.props;
    console.log('images', images);
    if (images) {
        return (
            <div>
                <h2>List of {type} images in databse</h2>
                <p>(Save on Sign up in Firebase Database)</p>

                {Object.keys(images).map(key =>
                    <div key={key}>

                        <ul>
                            <li>
                                <ImageItem type={type} pic={images[key].downloadUrl} name={images[key].name}
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