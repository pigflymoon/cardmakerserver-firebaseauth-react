import {storage} from './firebase';

//User API

export const getPaidImages = () =>
    storage.ref().child('paidImages');

export const getDefaultImages = () =>
    storage.ref().child('freeImages');

export const getImages = () =>
    storage.ref().child('uploadImages');

// category
// birthday
export const getBirthdayImages = () =>
    storage.ref().child('birthdayImages');
// holiday
export const getHolidayImages = () =>
    storage.ref().child('holidayImages');
// wedding
export const getWeddingImages = () =>
    storage.ref().child('weddingImages');
// others
export const getOtherImages = () =>
    storage.ref().child('otherImages');