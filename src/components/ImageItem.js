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

    // deleteCardsImagesByType = (type, imageId) => {
    //     var uploadCardsImagesRef = db.getImagesRefByTCategoryAndType('cards', type);
    //     var self = this;
    //     uploadCardsImagesRef.child(imageId).remove().then(function () {//delete image node from database
    //         alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
    //         // Create a reference to the file to delete
    //         var desertRef = storage.getImagesByCategoryAndType('cards', type).child(name);//delete image from storage as well.
    //         // Delete the file
    //         desertRef.delete().then(function () {
    //             // File deleted successfully
    //             self.setState({isDeleted: ' is Deleted'})
    //         }).catch(function (error) {
    //             // Uh-oh, an error occurred!
    //         });
    //
    //     });
    // }


    handleDelete = (category, type, imageId, fileName, url) => {
        console.log('You clicked the delete icon.', imageId, 'fileName is ,', fileName, 'url is ', url); // eslint-disable-line no-alert

        var uploadCardsImagesRef = db.getImagesRefByTCategoryAndType(category, type);
        var self = this;
        uploadCardsImagesRef.child(imageId).remove().then(function () {//delete image node from database
            alert('The picture of ' + fileName + ', id is ' + imageId + ' is deleted!');
            // Create a reference to the file to delete
            var desertRef = storage.getImagesByCategoryAndType(category, type).child(fileName);//delete image from storage as well.
            // Delete the file
            desertRef.delete().then(function () {
                // File deleted successfully
                self.setState({isDeleted: ' is Deleted'})
            }).catch(function (error) {
                // Uh-oh, an error occurred!
            });

        });


        /*
         if (type == 'birthday') {
         var uploadBirthdayImagesRef = db.getBirthdayImages();//db
         var self = this;
         uploadBirthdayImagesRef.child(imageId).remove().then(function () {//delete image node from database
         alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
         // Create a reference to the file to delete
         var desertRef = storage.getBirthdayImages().child(name);//delete image from storage as well.
         // Delete the file
         desertRef.delete().then(function () {
         // File deleted successfully
         self.setState({isDeleted: ' is Deleted'})
         }).catch(function (error) {
         // Uh-oh, an error occurred!
         });

         });
         } else if (type == 'holiday') {
         var uploadHolidayImagesRef = db.getHolidayImages();//db
         var self = this;
         uploadHolidayImagesRef.child(imageId).remove().then(function () {//delete image node from database
         alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
         // Create a reference to the file to delete
         var desertRef = storage.getHolidayImages().child(name);//delete image from storage as well.
         // Delete the file
         desertRef.delete().then(function () {
         // File deleted successfully
         self.setState({isDeleted: ' is Deleted'})
         }).catch(function (error) {
         // Uh-oh, an error occurred!
         });

         });
         } else if (type == 'wedding') {
         var uploadWeddingImagesRef = db.getWeddingImages();//db
         var self = this;
         uploadWeddingImagesRef.child(imageId).remove().then(function () {//delete image node from database
         alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
         // Create a reference to the file to delete
         var desertRef = storage.getWeddingImages().child(name);//delete image from storage as well.
         // Delete the file
         desertRef.delete().then(function () {
         // File deleted successfully
         self.setState({isDeleted: ' is Deleted'})
         }).catch(function (error) {
         // Uh-oh, an error occurred!
         });

         });
         } else {
         var uploadOtherImagesRef = db.getOtherImages();//db
         var self = this;
         uploadOtherImagesRef.child(imageId).remove().then(function () {//delete image node from database
         alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
         // Create a reference to the file to delete
         var desertRef = storage.getOtherImages().child(name);//delete image from storage as well.
         // Delete the file
         desertRef.delete().then(function () {
         // File deleted successfully
         self.setState({isDeleted: ' is Deleted'})
         }).catch(function (error) {
         // Uh-oh, an error occurred!
         });

         });
         }

         */


    }

    render() {
        let {category, type, pic, fileName, imageId} = this.props;
        var showName = fileName + this.state.isDeleted
        return (
            <Chip
                avatar={<Avatar src={pic}/>}
                label={showName}
                onDelete={() => this.handleDelete(category, type, imageId, fileName, pic)}

            />
        )
    }
}
