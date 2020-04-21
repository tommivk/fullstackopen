import patients = require('../../data/patients.json');
import { Patient, ExcludeSsn, newPatientEntry, PublicPatient } from '../types';


const getPatientsWithoutSsn = (): ExcludeSsn[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getById = (id: string): PublicPatient | undefined => {

    return patients.find((p) => p.id === id);
};

const generateId = (): string => {
    const id = Math.random() * 999999999999999;
    return id.toString();
};

const addEntry = (entry: newPatientEntry): Patient => {

    const newPatient = {
        id: generateId(),
        ...entry
    };

    console.log(newPatient);
    patients.push(newPatient);
    return newPatient;
};



export default { getPatientsWithoutSsn, addEntry, getById };