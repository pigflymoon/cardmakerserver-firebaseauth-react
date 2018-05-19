// This file is shared across the demos.

import React  from 'react';
import {
    Link
} from 'react-router-dom';
import ListItem from 'material-ui/List/ListItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

export const mailFolderListItems = (
    <div>
        <ListItem component={Link} to="upload-holidayCards" button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Holiday"/>
        </ListItem>
        <ListItem component={Link} to="upload-birthdayCards" button>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Birthday"/>
        </ListItem>
        <ListItem component={Link} to="upload-thankyouCards" button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Thank You"/>
        </ListItem>

    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary=""/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary=""/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary=""/>
        </ListItem>
    </div>
);
