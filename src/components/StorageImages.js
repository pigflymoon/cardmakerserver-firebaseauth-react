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
            images: null,
        };
    }

    componentDidMount() {
        // console.log('Home is mounted')
        db.onceGetFreeImages().then(snapshot => {
            this.setState(() => ({images: snapshot.val()}));
        })

    }

    render() {
        const {classes} = this.props;
        // console.log('classes props', classes)
        const {images} = this.state;
        return (
            <div>
                <h1>Free Images from storage</h1>
                <p>Images :</p>
                {!!images && <ImagesList images={images} classes={classes}/>}



            </div>
        );
    }
}


const ImagesList = ({images, classes}) => {

    // const { classes } = this.props;
    // console.log('images', images, 'classes,', classes);

    return (
        <div>
            <h2>List of Usernames of Users</h2>
            <p>(Save on Sign up in Firebase Database)</p>

            {Object.keys(images).map(key =>
                <div key={key}>

                    <ul>
                        <li>
                            <ImageItem pic={images[key].downloadUrl} name ={images[key].Name} imageId={key}/>

                        </li>

                    </ul>

                </div>
            )}
        </div>
    )
}


const authCondition = (authUser) => !!authUser;


ImagesListPage = withRoot(withStyles(styles)(ImagesListPage));
export default withAuthorization(authCondition)(ImagesListPage);