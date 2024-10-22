import * as yup from 'yup';

export const editCardSchema = yup.object().shape({
  title: yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot be longer than 100 characters'), // Añadiendo validación de longitud
  description: yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  image: yup.string()
    .url('Image must be a valid URL')
    .optional(),
  color: yup.string()
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex code'), // Validación de formato hex
  subtitle: yup.string()
    .optional()
    .min(3, 'Subtitle must be at least 3 characters'), // Campo adicional opcional
  phone: yup.string()
    .optional()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'), // Validación opcional para phone
  email: yup.string()
    .email('Must be a valid email')
    .optional(),
});

