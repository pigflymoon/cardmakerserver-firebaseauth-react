import React, {Component} from 'react';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import withAuthorization from './withAuthorization';
import {db} from '../firebase';
const styles = {
    card: {
        maxWidth: 345,
    },
};

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        console.log('Home is mounted')
        // db.onceGetUsers().then(snapshot =>
        //     this.setState(() => ({users: snapshot.val()}))
        // );
        db.onceGetImages().then(snapshot => {
            console.log('snapshot', snapshot.val());
            // var images = snapshot.val();
            // Object.keys(images).map(function (key, index) {
            //     console.log('key', key, 'Name', images[key].Name, 'url', images[key].downloadUrl)
            // });
            this.setState(() => ({images: snapshot.val()}));
        })

    }

    render() {
        const {users, images} = this.state;
        const { classes } = this.props;
        console.log('classes',classes)
        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                {/*{!!users && <UserList users={users}/>}*/}
                <p>Images :</p>
                {!!images && <ImagesList images={images} />}

            </div>
        );
    }
}

const UserList = ({users}) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Save on Sign up in Firebase Database)</p>
        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>)}
    </div>

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

export default withAuthorization(authCondition)(HomePage);
