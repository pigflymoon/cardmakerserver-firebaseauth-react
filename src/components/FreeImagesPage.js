import React, {Component} from 'react';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';


class FreeImagesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: null,
        };
    }

    componentDidMount() {
        console.log('Home is mounted')
        db.onceGetFreeImages().then(snapshot => {
            this.setState(() => ({images: snapshot.val()}));
        })

    }

    render() {
        const {images} = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                <p>Images :</p>
                {!!images && <ImagesList images={images} />}

            </div>
        );
    }
}



const ImagesList = ({images}) => {

    // const { classes } = this.props;
    console.log('images', images);

    return (
        <div>
            <h2>List of Usernames of Users</h2>
            <p>(Save on Sign up in Firebase Database)</p>

            {Object.keys(images).map(key =>
                <div key={key}>

                    <ul>
                        <li><img src={images[key].downloadUrl} alt={images[key].Name} width="50"/></li>

                    </ul>

                </div>
            )}
        </div>
    )
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(FreeImagesPage);
