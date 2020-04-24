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
    entries: Entry[];
}

export type newPatientEntry = Omit<Patient, 'id'>;

export type newEntry = Omit<Entry, 'id'>;



export type ExcludeSsn = Omit<Patient, 'ssn' | 'entries'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface EntryBase {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}





interface OccupationalHealthcareEntry extends EntryBase {
    type: 'OccupationalHealthcare';
    employerName: string;
    diagnosisCodes?: Array<Diagnose['code']>;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends EntryBase {
    type: 'Hospital';
    discharge?: {
        date: string;
        criteria: string;
    };
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheck extends EntryBase {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;

}
export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheck;
