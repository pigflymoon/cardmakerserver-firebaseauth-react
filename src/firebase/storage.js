import {storage} from './firebase';

//User API

export const getImages = () =>
    storage.ref().child('images');

