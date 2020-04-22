import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue } from './state';
import { Patient } from './types';
import { setPatientList } from './state/reducer';

import PatientListPage from './PatientListPage';
import SinglePatientPage from './PatientInfo/SinglePatientPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        // dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi });
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>
          <Button as={Link} to='/' primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path='/patients/:id' render={() => <SinglePatientPage />} />
            <Route path='/' render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;