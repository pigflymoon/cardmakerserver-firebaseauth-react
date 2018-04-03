import {db} from './firebase';

//User API

export const doCreateUser = (id, username, email) =>
    db.ref(`users/${id}`).set({
        username,
        email,
        role: {free_user: true, paid_user: false, admin: false}
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const getPaidUploadImages = () =>
    db.ref().child("paidUploadImages");

export const onceGetPaidImages = () =>
    db.ref('paidUploadImages').once('value');


export const getFreeUploadImages = () =>
    db.ref().child("freeUploadImages");

export const onceGetFreeImages = () =>
    db.ref('freeUploadImages').once('value');


export const getUploadImages = () =>
    db.ref().child("uploadImages");

export const onceGetImages = () =>
    db.ref('uploadImages').once('value');