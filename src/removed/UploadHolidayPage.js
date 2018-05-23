import React, {Component} from 'react';
import withAuthorization from './withAuthorization';
import {db, storage} from '../firebase';
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
import {firebase} from '../firebase';

import Chip from 'material-ui/Chip';
import {CircularProgress} from 'material-ui/Progress';

import withRoot from './withRoot';
import {saveImage} from '../utils/firebaseImageApi';

import SimpleSnackbar from '../widgets/snackBar';
import AlertDialog from '../widgets/alert';
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
    }

});


class UploadHolidayPage extends Component {
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
                self.setState({open:true});
                self.setState({uploading: false, choseFiles: []});

            });
    }

    filesUpload = (files) => {
        var imagesRef = storage.getHolidayImages();//storage
        var uploadImagesRef = db.getHolidayImages();//db

        // var newPostKey = firebaseApp.database().ref().child('images').push().key;

        if (files) {
            for (let file of files) {
                this.fileUpload(file, imagesRef, uploadImagesRef);//every file
            }
        } else {
            console.log('no file')
        }
    }


    render() {
        const {classes} = this.props;
        const {anchor} = this.state;
        console.log('classes props',classes)
        // if (showUpload) {
        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Upload  images for  holiday
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
                        <SimpleSnackbar show={this.state.uploading}/>
                        <AlertDialog open={this.state.open}/>
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
                        <div className={classes.filesWrapper}>
                            {this.state.choseFiles ? (this.state.choseFiles).map((file, index) => {
                                    return (
                                        <Chip
                                            label={file.name}
                                            className={classes.file}
                                            key={index}
                                            onDelete={ this.handleUnChoose(file)}

                                        />
                                    )
                                }) : null}
                        </div>

                        <div className="imgPreview">

                            {this.state.imagePreviewUrls ? (this.state.imagePreviewUrls).map((image, index) => {
                                    return (
                                        <div key={index}><img src={image} width={50}/></div>
                                    )
                                }) : null}
                        </div>


                        {this.state.uploading ? <CircularProgress className={classes.progress}/>
                            : <Typography>{'Finished! Please choose files to upload.'}</Typography>}

                    </main>
                </div>
            </div>
        );
        // } else {
        //     return (
        //         <div>
        //             <Typography variant="title" color="inherit" noWrap>
        //                 404
        //             </Typography>
        //         </div>
        //     )
        // }

    }
}


const authCondition = (authUser) => !!authUser;


UploadHolidayPage = withRoot(withStyles(styles)(UploadHolidayPage));
export default withAuthorization(authCondition)(UploadHolidayPage);
