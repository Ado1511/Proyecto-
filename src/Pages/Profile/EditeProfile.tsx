import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, TextInput } from "flowbite-react";
import EditProfileSchema from "../../validations/EditUserSchema"; 
import { toast } from "react-toastify";
import axios from "axios";

type FormData = {
  email: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  image: {
    url: string;
    alt: string;
  };
  isBusiness: boolean;
};

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<FormData | null>(null);
  const userId = "6559f2dbdedf2db2b52bde42"; // Aquí puedes obtener el ID desde el localStorage
  const authToken = localStorage.getItem('authToken'); // Asegúrate de almacenar el token de autenticación

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(EditProfileSchema),
  });

  // Obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`);
        setUserData(response.data);
        reset(response.data); // Pre-rellenar el formulario con los datos del usuario
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [reset, userId]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const updatedData = {
      name: {
        first: data.name.first,
        middle: data.name.middle,
        last: data.name.last,
      },
      phone: data.phone,
      email: data.email, // Incluye el email en los datos a enviar
      image: {
        url: data.image.url,
        alt: data.image.alt,
      },
      address: {
        state: data.address.state,
        country: data.address.country,
        city: data.address.city,
        street: data.address.street,
        houseNumber: data.address.houseNumber,
        zip: data.address.zip,
      },
      isBusiness: data.isBusiness, // Incluye isBusiness si es necesario
    };

    try {
      await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`, updatedData, {
        headers: {
          'x-auth-token': authToken, // Incluye el token de autenticación aquí
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // O puedes mostrar un spinner o similar
  }

  if (!userData) {
    return <div>No user data available.</div>; // Manejo de caso sin datos de usuario
  }

  return (
    <div className="flex flex-col items-center justify-start gap-10 m-auto" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-6 m-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-dark">Edit Profile</h1>

        {/* Email */}
        <TextInput
          {...register("email")}
          placeholder="Email"
          type="email"
          className="mb-2"
          color={errors.email ? "failure" : "gray"}
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        {/* Name fields */}
        <div className="flex space-x-2">
          <TextInput
            {...register("name.first")}
            placeholder="First Name"
            className="mb-2"
            color={errors.name?.first ? "failure" : "gray"}
          />
          <TextInput
            {...register("name.middle")}
            placeholder="Middle Name"
            className="mb-2"
          />
          <TextInput
            {...register("name.last")}
            placeholder="Last Name"
            className="mb-2"
            color={errors.name?.last ? "failure" : "gray"}
          />
        </div>
        {errors.name?.first && <p className="text-red-600">{errors.name.first.message}</p>}
        {errors.name?.last && <p className="text-red-600">{errors.name.last.message}</p>}

        {/* Phone */}
        <TextInput
          {...register("phone")}
          placeholder="Phone"
          type="tel"
          className="mb-2"
          color={errors.phone ? "failure" : "gray"}
        />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

        {/* Image URL */}
        <TextInput
          {...register("image.url")}
          placeholder="Image URL"
          className="mb-2"
          color={errors.image?.url ? "failure" : "gray"}
        />
        {errors.image?.url && <p className="text-red-600">{errors.image.url.message}</p>}

        {/* Image Alt Text */}
        <TextInput
          {...register("image.alt")}
          placeholder="Image Alt Text"
          className="mb-2"
        />

        {/* Address fields */}
        <TextInput
          {...register("address.country")}
          placeholder="Country"
          className="mb-2"
          color={errors.address?.country ? "failure" : "gray"}
        />
        {errors.address?.country && <p className="text-red-600">{errors.address.country.message}</p>}

        <TextInput
          {...register("address.state")}
          placeholder="State"
          className="mb-2"
        />

        <TextInput
          {...register("address.city")}
          placeholder="City"
          className="mb-2"
          color={errors.address?.city ? "failure" : "gray"}
        />
        {errors.address?.city && <p className="text-red-600">{errors.address.city.message}</p>}

        <TextInput
          {...register("address.street")}
          placeholder="Street"
          className="mb-2"
          color={errors.address?.street ? "failure" : "gray"}
        />
        {errors.address?.street && <p className="text-red-600">{errors.address.street.message}</p>}

        <TextInput
          {...register("address.houseNumber")}
          placeholder="House Number"
          type="number"
          className="mb-2"
          color={errors.address?.houseNumber ? "failure" : "gray"}
        />
        {errors.address?.houseNumber && <p className="text-red-600">{errors.address.houseNumber.message}</p>}

        <TextInput
          {...register("address.zip")}
          placeholder="ZIP Code"
          type="number"
          className="mb-2"
          color={errors.address?.zip ? "failure" : "gray"}
        />
        {errors.address?.zip && <p className="text-red-600">{errors.address.zip.message}</p>}

        {/* Submit Button */}
        <Button type="submit" className="mt-4" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
