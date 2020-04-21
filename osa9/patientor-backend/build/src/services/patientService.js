"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patients = require("../../data/patients.json");
const Patients = patients;
const getEntries = () => {
    return Patients;
};
exports.default = { getEntries };
