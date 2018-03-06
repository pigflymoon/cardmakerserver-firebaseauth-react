import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {db, storage} from '../firebase';

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: '',
        };
    }

    handleDelete = (type,imageId, name, url) => {
        console.log('You clicked the delete icon.', imageId, 'name is ,', name, 'url is ', url); // eslint-disable-line no-alert
        if(type =='free'){
            var uploadFreeImagesRef = db.getFreeUploadImages();//db
            var self = this;
            uploadFreeImagesRef.child(imageId).remove().then(function () {//delete image node from database
                alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
                // Create a reference to the file to delete
                var desertRef = storage.getDefaultImages().child(name);//delete image from storage as well.
                // Delete the file
                desertRef.delete().then(function () {
                    // File deleted successfully
                    self.setState({isDeleted: ' is Deleted'})
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                });

            });
        }else{
            var uploadPaidImagesRef = db.getPaidUploadImages();//db
            var self = this;
            uploadPaidImagesRef.child(imageId).remove().then(function () {//delete image node from database
                alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
                // Create a reference to the file to delete
                var desertRef = storage.getImages().child(name);//delete image from storage as well.
                // Delete the file
                desertRef.delete().then(function () {
                    // File deleted successfully
                    self.setState({isDeleted: ' is Deleted'})
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                });

            });
        }


    }

    render() {
        let {type,pic, name, imageId} = this.props;
        var showName = name + this.state.isDeleted
        return (
            <Chip
                avatar={<Avatar src={pic}/>}
                label={showName}
                onDelete={() => this.handleDelete(type,imageId, name, pic)}

            />
        )
    }
}
