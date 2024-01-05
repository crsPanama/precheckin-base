import * as yup from 'yup';

export default yup.object({
  Name: yup.string().required(),
  Renters_Email: yup.string().email().required(),
  Licencia: yup.string().required(),
  Phone_Number: yup.string().required(),
});
