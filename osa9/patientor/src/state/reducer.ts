import { State } from "./state";
import { Patient } from "../types";

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
    type: "UPDATE_PATIENT";      ///////
    payload: Patient;
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

      // const patient = state.patients[action.payload.id];
      console.log(action.payload);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
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
