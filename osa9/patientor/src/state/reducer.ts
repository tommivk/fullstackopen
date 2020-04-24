import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  |
  {
    type: "ADD_ENTRY";
    payload: Entry;
    id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":

      console.log(action.payload);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }

      };
    case "ADD_ENTRY":
      const patient = state.patients[action.id];
      patient.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: patient
        }
      };
    default:
      return state;
  }
};

export const addPatient = (payload: Patient) => {
  return {
    type: "ADD_PATIENT" as const,
    payload: payload
  };
};

export const addEntry = (id: string, payload: Entry) => {
  return {
    type: "ADD_ENTRY" as const,
    payload: payload,
    id: id,
  };
};

export const setPatientList = (payload: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as const,
    payload: payload
  };
};

export const updatePatient = (payload: Patient) => {
  return {
    type: "UPDATE_PATIENT" as const,
    payload: payload,
  };
};

export const setDiagnoses = (payload: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSES" as const,
    payload: payload
  };
};