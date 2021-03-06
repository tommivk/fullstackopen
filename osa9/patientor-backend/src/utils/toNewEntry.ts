/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry } from '../types';

const isString = (text: any): text is string => {

    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};


const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const generateId = (): string => {
    const id = Math.floor(Math.random() * 999999999999999);
    return id.toString();
};

const toNewEntry = (object: any): Entry => {

    switch (object.type) {
        case 'OccupationalHealthcare':
            return {
                id: generateId(),
                type: 'OccupationalHealthcare',
                specialist: parseSpecialist(object.specialist),
                date: parseDate(object.date),
                description: parseDescription(object.description),
                diagnosisCodes: object.diagnosisCodes,
                employerName: object.employerName,
                sickLeave: {
                    startDate: object.sickLeave.startDate,
                    endDate: object.sickLeave.endDate
                },
            };
        case 'HealthCheck':
            return {
                id: generateId(),
                type: 'HealthCheck',
                specialist: parseSpecialist(object.specialist),
                date: parseDate(object.date),
                description: parseDescription(object.description),
                healthCheckRating: object.healthCheckRating

            };
        case 'Hospital':
            return {
                id: generateId(),
                type: 'Hospital',
                specialist: parseSpecialist(object.specialist),
                date: parseDate(object.date),
                description: parseDescription(object.description),
                diagnosisCodes: object.diagnosisCodes,
                discharge: {
                    date: object.discharge.date,
                    criteria: object.discharge.criteria,
                },
            };
        default:
            throw new Error('Incorrect or missing type: ' + object.type);
    }
};



export default toNewEntry;