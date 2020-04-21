import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses = diagnoseService.getEntries();
    res.send(diagnoses);
});

export default router;
