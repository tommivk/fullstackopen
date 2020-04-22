import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state/state';
import axios from 'axios';
import { Patient } from '../types';
import { updatePatient } from '../state/reducer';

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  React.useEffect(() => {
    axios.get<void>(`http://localhost:3001/api/patients/${id}`);

    const fetchPatient = async () => {
      console.log('GET');
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `http://localhost:3001/api/patients/${id}`
        );
        // dispatch({ type: 'UPDATE_PATIENT', payload: fetchedPatient });
        dispatch(updatePatient(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient === undefined || patient.ssn === undefined) {
      fetchPatient();
    }
  }, [dispatch, id, patient]);
  console.log(patient);
  if (patient) {
    return (
      <div>
        <div>
          <strong>
            <h2> {patient.name}</h2>
          </strong>
        </div>
        <div>
          <strong>Date of Birth: {patient.dateOfBirth}</strong>
        </div>
        <div>
          <strong>Occupation: {patient.occupation}</strong>
        </div>
        <div>
          <strong>Gender: {patient.gender}</strong>
        </div>
        <div>
          <strong>SSN: {patient.ssn} </strong>
        </div>
      </div>
    );
  }
  return <div>Not found</div>;
};

export default SinglePatientPage;
