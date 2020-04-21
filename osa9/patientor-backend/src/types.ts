export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type newPatientEntry = Omit<Patient, 'id'>;

export type ExcludeSsn = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}