import React, {Component} from 'react';
import {db, storage} from '../firebase';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import List from 'material-ui/List';
// import IconButton from 'material-ui/core/IconButton';
import Hidden from 'material-ui/Hidden';

import withAuthorization from '../components/withAuthorization';
import withRoot from '../components/withRoot';import saveImage from '../utils/saveImage';

import SimpleSnackbar from '../widgets/snackBar';
import AlertDialog from '../widgets/alert'
import { mailFolderListItems, otherMailFolderListItems } from '../components/tileData';;
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
    // drawerPaper: {
    //     position: 'relative',
    //     // height: '100%',
    //     width: drawerWidth,
    // },
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
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
    imgPreview: {
        height: 'auto',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },


});


class UploadThankYouCardsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // users: null,
            file: null,
            fileName: '',
            uploading: false,
            imagePreviewUrl: '',
            imagePreviewUrls: [],
            showUpload: false,
            open:false,
            value: 0,
            mobileOpen: false,
        };
        console.log('this props&&&&&&&&&&&&,',this.props)

    }


    handleAddImage = (e) => {
        e.preventDefault();
        var choseFiles = e.target.files;

        var files = [], imagePreviewUrls = [];
        for (var file of choseFiles) {
            files.push(file);
            let reader = new FileReader();
            reader.onloadend = () => {
                imagePreviewUrls.push(reader.result)
                this.setState({
                    file: file,
                });
            }
            reader.readAsDataURL(file)
        }

        this.setState({choseFiles: files, imagePreviewUrls: imagePreviewUrls});
        e.target.value = '';
    }

    handleUnChoose = data => () => {
        const filesData = [...this.state.choseFiles];
        const imagesData = [...this.state.imagePreviewUrls];

        const fileToDelete = filesData.indexOf(data);

        filesData.splice(fileToDelete, 1);
        imagesData.splice(fileToDelete, 1);
        this.setState({choseFiles: filesData, imagePreviewUrls: imagesData});
    }

    handleUpload = (e) => {
        e.preventDefault();
        this.setState({uploading: true});
        this.filesUpload(this.state.choseFiles);
    }

    getDownloadUrl = (uploadImagesRef, snapshot) => {//db,
        if (snapshot.downloadURL !== null) {
            var downloadUrl = snapshot.downloadURL;
            var newImageKey = uploadImagesRef.push().key;
            var saveFilename = snapshot.metadata.name;
            uploadImagesRef.child(newImageKey + '_image').set({
                downloadUrl: downloadUrl,
                name: saveFilename
            });
        } else {
            console.log('download url is not ready!')
        }
    }

    fileUpload = (file, imagesRef, uploadImagesRef) => {//file,storage,db
        var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1];

        var task = saveImage(file, filename, imagesRef)
        var self = this;

        task.then(function (snapshot) {
            self.getDownloadUrl(uploadImagesRef, snapshot);//db

        })
            .then(function () {
                console.log('upload is finished!')
                self.setState({uploading: false, choseFiles: []});
            })
            .catch(function (error) {
                console.error('error is', error);
                self.setState({open: true});
                self.setState({uploading: false, choseFiles: []});

            });
    }

    filesUpload = (files) => {
        var imagesRef = storage.getBirthdayImages();//storage
        var uploadImagesRef = db.getBirthdayImages();//db

        // var newPostKey = firebaseApp.database().ref().child('images').push().key;

        if (files) {
            for (let file of files) {
                this.fileUpload(file, imagesRef, uploadImagesRef);//every file
            }
        } else {
            console.log('no file')
        }
    }


    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const {classes} = this.props;
        // const {anchor} = this.state;

        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Divider />
                <List>{mailFolderListItems}</List>
                <Divider />
                <List>{otherMailFolderListItems}</List>
            </div>
        );
        // if (showUpload) {
        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Upload images for Thank You Cards
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        <SimpleSnackbar show={this.state.uploading}/>
                        <AlertDialog open={this.state.open}/>
                        <Paper>
                            <Tabs
                                value={this.state.value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={this.handleChange}
                            >
                                <Tab label="Active" />
                                <Tab label="Disabled"  />
                                <Tab label="Active" />
                            </Tabs>
                        </Paper>

                    </main>
                </div>
            </div>
        );


    }
}


const authCondition = (authUser) => !!authUser;


UploadThankYouCardsPage = withRoot(withStyles(styles)(UploadThankYouCardsPage));
export default withAuthorization(authCondition)(UploadThankYouCardsPage);
