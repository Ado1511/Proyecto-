import * as yup from 'yup';

export const cardSchema = yup.object().shape({
  title: yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot be longer than 100 characters'),
  description: yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  subtitle: yup.string()
    .optional()
    .min(3, 'Subtitle must be at least 3 characters'),
  phone: yup.string()
    .optional()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: yup.string()
    .email('Must be a valid email')
    .optional(), 
  image: yup.object().shape({
    url: yup.string()
      .url('Image must be a valid URL')
      .required('Image URL is required'),
    alt: yup.string().optional(),
  }).optional(),
  web: yup.string().optional(),
  address: yup.object().shape({
    state: yup.string().optional(),
    country: yup.string().optional(),
    city: yup.string().optional(),
    street: yup.string().optional(),
    houseNumber: yup.number().optional(),
    zip: yup.number().optional(),
  }).optional(),
  bizNumber: yup.number().optional(),
  _id: yup.string().required(), // Requerido para la actualización
  user_id: yup.string().required(), // Requerido para la actualización
});
