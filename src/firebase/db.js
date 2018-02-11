import {db} from './firebase';

//User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const getUploadImages = () =>
    db.ref().child("uploadImages");

export const onceGetImages = () =>
    db.ref('uploadImages').once('value');