import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { Icon, Divider } from 'semantic-ui-react';
import { useStateValue } from '../state/state';

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const ShowEntries: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnoses || diagnoses === undefined) {
    return null;
  }

  switch (entry.type) {
    case 'OccupationalHealthcare':
      let sickLeave;
      if (entry.sickLeave) {
        if (
          entry.sickLeave.startDate !== '' ||
          entry.sickLeave.endDate !== ''
        ) {
          sickLeave = (
            <div>
              <br />
              Sick Leave:
              <ul>
                <li>Start date: {entry.sickLeave.startDate}</li>
                <li>End date: {entry.sickLeave.endDate}</li>
              </ul>
            </div>
          );
        }
      }

      return (
        <div>
          <Divider section></Divider>
          <div>
            <h3>
              {entry.date}{' '}
              <Icon
                aria-hidden='true'
                size='large'
                className='user doctor'
              ></Icon>
            </h3>
          </div>
          <div>{entry.description}</div>
          <div>
            <ul>
              {entry.diagnosisCodes?.map((x) => (
                <p key={x}>
                  <li key={x}>
                    {x} {diagnoses[x].name}
                  </li>
                </p>
              ))}
            </ul>
          </div>
          <p>Specialist: {entry.specialist}</p>
          <div>Employer name: {entry.employerName}</div>
          <div>{sickLeave}</div>
        </div>
      );
    case 'HealthCheck':
      return (
        <div>
          <Divider section></Divider>
          <div>
            <h3>
              {entry.date}{' '}
              <Icon
                aria-hidden='true'
                size='large'
                className='user doctor'
              ></Icon>
            </h3>
            <div>{entry.description}</div>
            <div>
              Health check rating: {HealthCheckRating[entry.healthCheckRating]}
            </div>
          </div>
        </div>
      );
    case 'Hospital':
      let discharge;
      if (entry.discharge) {
        if (entry.discharge.date !== '' || entry.discharge.criteria !== '') {
          discharge = (
            <div>
              <br />
              Discharge:
              <ul>
                <li>Date: {entry.discharge.date}</li>
                <li>Criteria: {entry.discharge.criteria}</li>
              </ul>
            </div>
          );
        }
        if (entry.discharge.date === '' && entry.discharge.criteria === '') {
          discharge = null;
        }
      }

      return (
        <div>
          <Divider section></Divider>
          <div>
            <h3>
              {entry.date}{' '}
              <Icon aria-hidden='true' size='large' className='hospital'></Icon>
            </h3>
          </div>
          <div>{entry.description}</div>
          <div>
            <ul>
              {entry.diagnosisCodes?.map((x) => (
                <li key={x}>
                  {x} {diagnoses[x].name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>Specialist: {entry.specialist}</p>
          </div>
          {discharge}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default ShowEntries;
