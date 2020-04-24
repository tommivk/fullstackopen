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

const HospitalForm: React.FC<FormProps> = ({ onSubmit, closeForm }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <Divider section></Divider>
      <h3>Add new entry</h3>

      <h4 className='ui horizontal divider header'>
        New hospital entry
        <Icon className='hospital'></Icon>
      </h4>
      <Formik
        initialValues={{
          date: '',
          specialist: '',
          type: 'Hospital',
          description: '',
          discharge: {
            date: '',
            criteria: '',
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

              <h4 className='ui dividing header'>Discharge</h4>
              <Field
                label='Date'
                placeholder='...'
                name='discharge.date'
                component={TextField}
              />
              <Field
                label='Criteria'
                placeholder='...'
                name='discharge.criteria'
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

export default HospitalForm;
