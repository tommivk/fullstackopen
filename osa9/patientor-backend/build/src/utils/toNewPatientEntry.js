"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    return {
        name: parseName(object.name),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
};
exports.default = toNewPatientEntry;
