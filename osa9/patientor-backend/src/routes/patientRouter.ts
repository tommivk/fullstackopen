import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getPatientsWithoutSsn();
    res.send(patients);
});

router.get('/:id', (req, res) => {
    let patient = patientService.getById(req.params.id);
    patient = { ...patient, entries: [] };
    if (patient) {
        res.status(200).send(patient);
    } else {
        res.status(400).send();
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatient);

        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;
