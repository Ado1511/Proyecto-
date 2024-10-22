export type TCard = {
  title: string;
  subtitle?: string;
  description: string; // Asegura que la descripción siempre sea una cadena
  image: {
    url: string;
  };
  phone?: string;
  email?: string;
  web?: string;
  address: {
    city: string; // Se requiere una ciudad
  };
  user_id: string; // El ID del usuario es obligatorio
  likes?: string[]; // Likes son opcionales
};