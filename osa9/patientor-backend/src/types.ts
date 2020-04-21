export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}
export interface Entry {

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

// export type ExcludeSsn = Omit<Patient, 'ssn' | 'entries'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}