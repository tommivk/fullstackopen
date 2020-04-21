import { newPatientEntry, Gender } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {

    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const parseName = (name: any): string => {

    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseSsn = (ssn: any): string => {

    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;

};

const parseGender = (gender: any): Gender => {

    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;

};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseOccupation = (occupation: any): string => {

    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const toNewPatientEntry = (object: any): newPatientEntry => {

    return {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation)
    };

};

export default toNewPatientEntry;