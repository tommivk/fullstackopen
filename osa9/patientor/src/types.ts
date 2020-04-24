export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

//////////////


interface EntryBase {
  id: string;
  specialist: string;
  date: string;
  description: string;
}

export interface OccupationalHealthcareEntry extends EntryBase {
  type: 'OccupationalHealthcare';
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends EntryBase {
  type: 'Hospital';
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export type EntryFormValues = {
  specialist: string;
  date: string;
  type: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  discharge?: {
    date: string;
    criteria: string;
  };
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheck;