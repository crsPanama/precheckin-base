import * as yup from 'yup';

export default yup.object({
  reservation: yup.string().required(),
  email: yup.string().email().required(),
});
