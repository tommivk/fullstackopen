import diagnoseData = require('../../data/diagnoses.json');
import { Diagnose } from '../types';


const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

const getEntries = (): Array<Diagnose> => {
    return diagnoses;
};

export default { getEntries };