export type TCard = {
  _id: string;
  title: string;
  subtitle?: string; // Optional
  description: string;
  phone?: string; // Optional
  email?: string; // Optional
  web?: string; // Optional
  image: {
    url: string;
    alt?: string; // Optional
  };
  address?: {
    state?: string; // Optional
    country?: string; // Optional
    city?: string; // Optional
    street?: string; // Optional
    houseNumber?: number; // Optional
    zip?: number; // Optional
  };
  bizNumber?: number; // Optional
  likes?: string[]; // Make likes optional
  user_id: string; // Assuming this is required
};
