"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import patients = require('../../data/patients.json');
const patientData_1 = __importDefault(require("../../data/patientData"));
const getPatientsWithoutSsn = () => {
    return patientData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getById = (id) => {
    let patient = patientData_1.default.find((p) => p.id === id);
    if (patient) {
        patient.entries.map((entry) => {
            switch (entry.type) {
                case 'HealthCheck':
                    break;
                case 'Hospital':
                    break;
                case 'OccupationalHealthcare':
                    break;
                default:
                    patient = undefined;
            }
        });
    }
    return patient;
};
const generateId = () => {
    const id = Math.floor(Math.random() * 999999999999999);
    return id.toString();
};
const addEntry = (entry) => {
    const newPatient = Object.assign({ id: generateId() }, entry);
    patientData_1.default.push(newPatient);
    return newPatient;
};
const addPatientEntry = (id, entry) => {
    const patient = patientData_1.default.find((p) => p.id === id);
    const newEntry = Object.assign({}, entry);
    patient === null || patient === void 0 ? void 0 : patient.entries.concat(newEntry);
    return newEntry;
};
exports.default = { getPatientsWithoutSsn, addEntry, getById, addPatientEntry };
