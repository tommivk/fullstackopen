import React from 'react';
import { EntryFormValues } from '../types';
import { Field, Formik, Form } from 'formik';
import { TextField, NumberField } from '../AddPatientModal/FormField';
import { Button, Divider, Icon } from 'semantic-ui-react';
import { validationSchema } from './validationSchema';
interface FormProps {
  onSubmit: (values: EntryFormValues) => void;
  closeForm: () => void;
}

export const HealthCheckForm: React.FC<FormProps> = ({
  onSubmit,
  closeForm,
}) => {
  return (
    <div>
      <Divider section></Divider>

      <h4 className='ui horizontal divider header'>
        New health check entry
        <Icon className='user doctor'></Icon>
      </h4>
      <Formik
        initialValues={{
          date: '',
          specialist: '',
          type: 'HealthCheck',
          description: '',
          healthCheckRating: 0,
          diagnosisCodes: [''],
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
        <Form className='ui form'>
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
            label='healthCheckRating'
            name='healthCheckRating'
            component={NumberField}
            min={0}
            max={3}
          />

          <Button type='submit' floated='left' color='red'>
            Add
          </Button>
        </Form>
      </Formik>
      <Button onClick={() => closeForm()} color='red'>
        {' '}
        Close Form
      </Button>
      <Divider section></Divider>
    </div>
  );
};

export default HealthCheckForm;
