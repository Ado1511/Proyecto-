import * as yup from 'yup';

export const cardSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().optional(),
  description: yup.string().required("Description is required"),
  phone: yup.string().optional(),
  email: yup.string().email("Invalid email").optional(),
  web: yup.string().url("Invalid URL").optional(),
  image: yup.object().shape({
    url: yup.string().url("Invalid URL").required("Image URL is required"),
    alt: yup.string().optional(),
  }),
  address: yup.object().shape({
    state: yup.string().optional(),
    country: yup.string().optional(),
    city: yup.string().required("City is required"), // Required based on your initial data structure
    street: yup.string().optional(),
    houseNumber: yup.number().optional(),
    zip: yup.number().optional(),
  }),
  bizNumber: yup.number().optional(),
  likes: yup.array().of(yup.string()).optional(), // Make likes optional
  user_id: yup.string().required("User ID is required"),
});
