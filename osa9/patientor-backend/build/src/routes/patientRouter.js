"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatientEntry_1 = __importDefault(require("../utils/toNewPatientEntry"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const patients = patientService_1.default.getPatientsWithoutSsn();
    res.send(patients);
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getById(req.params.id);
    if (patient) {
        res.status(200).send(patient);
    }
    else {
        res.status(400).send();
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry_1.default(req.body);
        const addedEntry = patientService_1.default.addEntry(newPatient);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const newEntry = toNewEntry_1.default(req.body);
    if (!req.body.date || !req.body.specialist || !req.body.description) {
        res.status(400).send().end();
    }
    try {
        const addedEntry = patientService_1.default.addPatientEntry(id, newEntry);
        res.status(200).json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
