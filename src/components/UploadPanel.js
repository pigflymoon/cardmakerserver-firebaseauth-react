import React, {Component} from 'react';
import {db, storage} from '../firebase';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';
import AddToPhotos from 'material-ui-icons/AddToPhotos';
import Chip from 'material-ui/Chip';
import {CircularProgress} from 'material-ui/Progress';

import saveImage from '../utils/saveImage';

export default class UploadPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // users: null,
            // file: null,
            // fileName: '',
            uploading: false,
            // imagePreviewUrl: '',
            imagePreviewUrls: [],
            // showUpload: false,
            open: false,
            activeTabIndex: this.props.activeTabIndex,
            imageCategory: this.props.imageCategory,
            activeTab: this.props.activeTab,
            // mobileOpen: false,
            choseFiles: null,
            uploadStatus: 'Please choose file to upload',
        };

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.activeTab !== nextProps.activeTab) {
            this.setState({
                imagePreviewUrls: [],
                uploadStatus: 'Please choose file to upload',
            });
        }
        this.setState({
            // imagePreviewUrls: [],
            // uploadStatus: 'Please choose file to upload',
            imageCategory: nextProps.imageCategory,
            activeTab: nextProps.activeTab,
            activeTabIndex: nextProps.activeTabIndex
        });

    }

    handleAddImage = (e, imageType) => {
        e.preventDefault();
        var uploadImageType = imageType;
        console.log('imageType is for ', uploadImageType);
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

    handleUpload = (e, category, imageType) => {
        e.preventDefault();
        console.log('choseFiles length', this.state.choseFiles)
        if (!(this.state.choseFiles) || this.state.choseFiles.length < 1) {
            this.setState({uploading: false, choseFiles: []});
            // this.props.onHandleDialog(true);
            this.props.onHandleUploadStatus({open: true, uploading: false, error: 'Please choose file'});

        } else {
            this.setState({uploading: true});
            this.props.onHandleUploadStatus({open: false, uploading: true, error: false});

            this.filesUpload(this.state.choseFiles, category, imageType);
        }


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
            this.setState({uploading: false, uploadStatus: 'Download url is not ready!'});
        }
    }

    fileUpload = (file, imagesRef, uploadImagesRef) => {//file,storage,db
        var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1];

        var task = saveImage(file, filename, imagesRef)
        var self = this;

        task.then(function (snapshot) {
            console.log('snapshot is ', snapshot)
            self.getDownloadUrl(uploadImagesRef, snapshot);//db

        })
            .then(function () {
                self.setState({
                    uploading: false,
                    uploadStatus: 'Upload is Finished! And save to the database ',
                    choseFiles: []
                });
                self.props.onHandleUploadStatus({open: true, uploading: false, error: false});

            })
            .catch(function (error) {
                console.error('error is', error);
                self.setState({uploading: false, choseFiles: []});
                self.props.onHandleUploadStatus({open: true, uploading: false, error: 'error'});


            });
    }

    filesUpload = (files, category, imageType) => {
        var imagesRef = storage.getImagesByCategoryAndType(category, imageType);
        var uploadImagesRef = db.getImagesRefByTCategoryAndType(category, imageType);
        // var imagesRef = storage.getBirthdayImages();//storage
        // var uploadImagesRef = db.getBirthdayImages();//db

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
        console.log('props is ', this.props)

        return (
            <Paper className={classes.paperContainer}>
                <div className="content">
                    Content for the tab: {this.state.activeTabIndex}
                    --{this.state.activeTab}
                </div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => this.handleAddImage(e, this.state.activeTab)}
                />
                <label htmlFor="raised-button-file">
                    <Button component="span" className={classes.button} color="default">
                        Choose Image for {this.state.activeTab}
                        <AddToPhotos className={classes.rightIcon}/>
                    </Button>
                </label>
                <label htmlFor="raised-button-file">
                    <Button type="submit"
                            onClick={(e) => this.handleUpload(e, this.state.imageCategory, this.state.activeTab)}
                            className={classes.button}
                            color="default">
                        Upload for {this.state.activeTab}
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
                    : <Typography>{this.state.uploadStatus}</Typography>}

            </Paper>
        );


    }
}




