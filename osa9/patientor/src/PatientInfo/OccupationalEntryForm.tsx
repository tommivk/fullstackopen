import React from 'react';
import { EntryFormValues } from '../types';
import { Field, Formik, Form } from 'formik';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { Button, Divider, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state/state';
import { validationSchema } from './validationSchema';

interface FormProps {
  onSubmit: (values: EntryFormValues) => void;
  closeForm: () => void;
}

const OccupationalForm: React.FC<FormProps> = ({ onSubmit, closeForm }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Divider section></Divider>
      <h3>Add new entry</h3>

      <h4 className='ui horizontal divider header'>
        New occupational healthcare entry
        <Icon className='user doctor'></Icon>
      </h4>
      <Formik
        initialValues={{
          date: '',
          specialist: '',
          type: 'OccupationalHealthcare',
          description: '',
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          return errors;
        }}
      >
        {({ setFieldValue, setFieldTouched }) => {
          return (
            <Form className='ui form'>
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <Field
                label='Description'
                placeholder='...'
                name='description'
                component={TextField}
              />
              <Field
                label='Specialist'
                placeholder='...'
                name='specialist'
                component={TextField}
              />
              <Field
                label='Date'
                placeholder='YYYY-MM-DD'
                name='date'
                component={TextField}
              />
              <Field
                label='Employer name'
                placeholder='...'
                name='employerName'
                component={TextField}
              />

              <h4 className='ui dividing header'>Sick Leave</h4>
              <Field
                label='Start date'
                placeholder='...'
                name='sickLeave.startDate'
                component={TextField}
              />
              <Field
                label='End date'
                placeholder='...'
                name='sickLeave.endDate'
                component={TextField}
              />
              <Button type='submit' floated='left' color='red'>
                Add
              </Button>
            </Form>
          );
        }}
      </Formik>
      <Button onClick={() => closeForm()} color='red'>
        {' '}
        Close Form
      </Button>
      <Divider section></Divider>
    </div>
  );
};

export default OccupationalForm;
