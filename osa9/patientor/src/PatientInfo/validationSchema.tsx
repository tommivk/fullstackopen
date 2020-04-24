import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  specialist: Yup.string()
    .required('Required')
    .matches(/^.[a-zA-ZäöüßÄÖÜ]+$/, {
      message:
        'name must be at least 3 characters long and only contain letters',
    })
    .min(3),
  description: Yup.string().required('Required').min(5),
  date: Yup.string().matches(
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    { message: 'date must be in YYYY/MM/DD format' }
  ),
  employerName: Yup.string().matches(/^.[a-zA-ZäöüßÄÖÜ]+$/, {
    message: 'name must be at least 3 characters long and only contain letters',
  }),
});

export default validationSchema;
