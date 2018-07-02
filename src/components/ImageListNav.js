import React  from 'react';
import {
    Link
} from 'react-router-dom';
import ListItem from 'material-ui/List/ListItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

export const mailFolderListItems = (
    <div>
        <ListItem component={Link} to="delete-holidayCards" button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Holiday Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-birthdayCards" button>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Birthday Cards"/>
        </ListItem>
        <ListItem component={Link} to="delete-thankyouCards" button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Thank You Cards"/>
        </ListItem>

    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem component={Link} to="delete-holidayInvitations" button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Holiday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-birthdayInvitations" button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="birthday Invitations"/>
        </ListItem>
        <ListItem component={Link} to="delete-weddingInvitations" button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="wedding Invitations"/>
        </ListItem>
    </div>
);