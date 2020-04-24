import React from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../state/state';
import axios from 'axios';
import { Patient, Entry, EntryFormValues } from '../types';
import { updatePatient, addEntry } from '../state/reducer';
import ShowEntries from './ShowEntries';
import EntryForm from './EntryForm';

const SinglePatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `http://localhost:3001/api/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
    } catch (e) {
      console.error(e.response.data);
    }
  };

  React.useEffect(() => {
    axios.get<void>(`http://localhost:3001/api/patients/${id}`);

    const fetchPatient = async () => {
      console.log('GET');
      try {
        const { data: fetchedPatient } = await axios.get<Patient>(
          `http://localhost:3001/api/patients/${id}`
        );

        dispatch(updatePatient(fetchedPatient));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient === undefined || patient.ssn === undefined) {
      fetchPatient();
    }
  }, [dispatch, id, patient]);

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

        <div>
          <br></br>
          <h3>Entries</h3>
          {patient.entries &&
            patient.entries.map((x) => <ShowEntries key={x.id} entry={x} />)}
        </div>
        <EntryForm onSubmit={submitNewEntry} />
      </div>
    );
  }
  return <div>Not found</div>;
};

export default SinglePatientPage;
