import React, { useState, useEffect } from 'react';
import { EntryFormValues } from '../types';
import { Field, Formik, Form } from 'formik';

import { Button, Divider, Form as uiForm, Grid } from 'semantic-ui-react';

import HealthCheckForm from './HealthCheckEntryForm';
import HospitalForm from './HospitalEntryForm';
import OccupationalForm from './OccupationalEntryForm';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

export type TypeOption = {
  value: string;
  label: string;
};

const typeOptions: TypeOption[] = [
  { value: 'OccupationalHealthcare', label: 'OccupationalHealthcare' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'HealthCheck', label: 'HealthCheck' },
];

const EntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState('');

  const closeForm = (): void => setSelectedType('');

  const handeTypeChange = (values: EntryFormValues) => {
    setSelectedType(values.type);
  };

  useEffect(() => {
    closeForm();
  }, [onSubmit]);

  if (selectedType === 'HealthCheck') {
    return <HealthCheckForm onSubmit={onSubmit} closeForm={closeForm} />;
  }
  if (selectedType === 'Hospital') {
    return <HospitalForm onSubmit={onSubmit} closeForm={closeForm} />;
  }
  if (selectedType === 'OccupationalHealthcare') {
    return <OccupationalForm onSubmit={onSubmit} closeForm={closeForm} />;
  }

  return (
    <div>
      <Divider section></Divider>
      <h3>Add new entry</h3>

      <Formik
        initialValues={{
          date: '',
          specialist: '',
          type: 'HealthCheck',
          description: '',
        }}
        onSubmit={handeTypeChange}
      >
        <Form>
          <Grid>
            <Grid.Row>
              <SelectField label='' name='type' options={typeOptions} />
            </Grid.Row>
            <Grid.Row>
              <Button type='submit' color='red'>
                Open Form
              </Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <uiForm.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </uiForm.Field>
);

export default EntryForm;
