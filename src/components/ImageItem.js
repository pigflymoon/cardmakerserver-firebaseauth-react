import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {db} from '../firebase';

export default class ImageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleted: '',
        };
    }

    handleDelete = (imageId, name) => {
        console.log('You clicked the delete icon.', imageId, 'name is ,', name); // eslint-disable-line no-alert
        var uploadFreeImagesRef = db.getFreeUploadImages();//db
        var self = this;
        uploadFreeImagesRef.child(imageId).remove().then(function () {
            alert('The picture of ' + name + ', id is ' + imageId + ' is deleted!');
            self.setState({isDeleted: ' is Deleted'})
        });

    }

    render() {
        let {pic, name, imageId} = this.props;
        console.log('imageId is ,', imageId)
        var showName = name + this.state.isDeleted
        return (
            <Chip
                avatar={<Avatar src={pic}/>}
                label={showName}
                onDelete={() => this.handleDelete(imageId, name)}

            />
        )
    }
}
