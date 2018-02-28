import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
export default class ImageItem extends Component {
    handleDelete = () => {
        alert('You clicked the delete icon.'); // eslint-disable-line no-alert
    }

    render() {
        let {pic, name} = this.props;
        return (
            <Chip
                avatar={<Avatar src={pic}/>}
                label={name}
                onDelete={this.handleDelete}

            />
        )
    }
}
