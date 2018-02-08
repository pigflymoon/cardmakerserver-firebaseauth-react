import React, {Component} from 'react';
import withAuthorization from './withAuthorization';
import {db, storage} from '../firebase';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';
import AddToPhotos from 'material-ui-icons/AddToPhotos';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import pic1 from '../images/1.jpg';

import {
    Link,
} from 'react-router-dom'
import withRoot from './withRoot';
import saveImage from '../utils/saveImage';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
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
        height: '100%',
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
    filesWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    file: {
        margin: 4,
        fontSize: 14,
    }

});


class UploadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            file: null,
            fileName: '',
        };
    }

    handleAddImage = (e) => {
        console.log('filename is :', e.target.files)
        var choseFiles = e.target.files;
        var choseFilesName = [];
        for (var file of choseFiles) {
            console.log('name is ', file.name);
            choseFilesName.push(file.name)
        }
        this.setState({file: e.target.files[0], filesName: choseFilesName});
    }

    handleUpload = (e) => {
        e.preventDefault();
        console.log('submit', this.state.file);
        this.fileUpload(this.state.file);
    }

    fileUpload = (file) => {

        var imagesRef = storage.getImages();
        var uploadImagesRef = db.getUploadImages();
        var newImageKey = uploadImagesRef.push().key;

        // var newPostKey = firebaseApp.database().ref().child('images').push().key;

        if (file) {
            var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1] + '_poster';

            var task = saveImage(file, filename, imagesRef)
            console.log('filename is ', filename);
            this.setState({fileName: filename})
            task.then(function (snapshot) {
                var downloadUrl = task.snapshot.downloadURL;

                uploadImagesRef.child(newImageKey + '_image').set({
                    downloadUrl: downloadUrl,
                    Name: filename
                });

                console.log('download url is: ', downloadUrl)
            })
                .catch(function (error) {
                    console.error('error', error);
                });
        } else {
            console.log('no file')
        }

    }

    componentDidMount() {
        db.onceGetUsers().then(snapshot =>
            this.setState(() => ({users: snapshot.val()}))
        );
    }

    render() {
        // const {users} = this.state;
        const {classes} = this.props;
        const {anchor} = this.state;
        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Permanent drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor={anchor}
                    >
                        <div className={classes.drawerHeader}/>
                        <Divider />

                    </Drawer>
                    <main className={classes.content}>
                        <Link to={'http://www.google.com/'}>
                            <Button label="Ok">OK</Button>
                        </Link>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(e) => this.handleAddImage(e)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" className={classes.button} color="default">
                                Choose Image
                                <AddToPhotos className={classes.rightIcon}/>
                            </Button>
                        </label>
                        <label htmlFor="raised-button-file">
                            <Button type="submit" onClick={(e) => this.handleUpload(e)} className={classes.button}
                                    color="default">
                                Upload
                                <FileUpload className={classes.rightIcon}/>
                            </Button>
                        </label>
                        <Typography>{'You think water moves fast? You should see ice.'}</Typography>

                        <div className={classes.filesWrapper}>
                            {this.state.filesName ? this.state.filesName.map((fileName,index) => (

                                    <Chip
                                        label={fileName}
                                        avatar={<Avatar src={pic1}/>}
                                        className={classes.file}
                                        key={index}
                                    />

                                )) : null}

                            <Typography>{'Choose files.'}</Typography>

                        </div>

                    </main>
                </div>
            </div>
        );
    }
}


// const UserList = ({users}) =>
//     <div>
//         <h2>List of Usernames of Users</h2>
//         <p>(Save on Sign up in Firebase Database)</p>
//         {Object.keys(users).map(key =>
//             <div key={key}>{users[key].username}</div>)}
//     </div>

const authCondition = (authUser) => !!authUser;


UploadPage = withRoot(withStyles(styles)(UploadPage));
export default withAuthorization(authCondition)(UploadPage);
