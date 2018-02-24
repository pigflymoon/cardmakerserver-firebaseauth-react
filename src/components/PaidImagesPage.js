import React, {Component} from 'react';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';


class PaidImagesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: null,
            error: false,
        };
    }

    componentDidMount() {
        console.log('Home is mounted');
        var self = this;
        db.onceGetImages().then(snapshot => {
            if (snapshot) {
                console.log('snapshot', snapshot.val());
                this.setState(() => ({images: snapshot.val()}));
            }

        }, function (error) {
            self.setState({error: true});
            // console.error('get images erros,', error);

        });


    }

    render() {
        const {images, error} = this.state;
        console.log('paid state,', this.state);
        return (
            <div>
                {error ?
                    <h1>404</h1>
                    : <div>
                        <h1>Paid images list</h1>
                        <p>This Page is accessible by paid-user signed in user.</p>
                        <p>Images :</p>
                        {!!images && <ImagesList images={images}/>}

                    </div> }
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

export default withAuthorization(authCondition)(PaidImagesPage);
