import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, TextInput, Checkbox } from "flowbite-react";
import RegisterSchema from "../../validations/RegisterSchema.joi"; 
import { toast } from "react-toastify";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
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

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(RegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", data);
      toast.success("Signup successful!");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-10 m-auto bg-gradient-to-b from-[#ff9846] to-white">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md p-6 m-auto">
        <h1 className="mt-2 mb-5 text-4xl font-bold text-dark">Sign Up</h1>

        {/* Email */}
        <TextInput
          {...register("email")}
          placeholder="Email"
          type="email"
          className="mb-2"
          color={errors.email ? "failure" : "gray"} />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}

        {/* Password */}
        <TextInput
          {...register("password")}
          placeholder="Password"
          type="password"
          className="mb-2"
          color={errors.password ? "failure" : "gray"} />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}

        {/* Name fields */}
        <div className="flex flex-col space-y-2">
          <TextInput
            {...register("name.first")}
            placeholder="First Name"
            className="mb-2"
            color={errors.name?.first ? "failure" : "gray"} />
          {errors.name?.first && <p className="text-red-600">{errors.name.first.message}</p>}
          
          <TextInput
            {...register("name.middle")}
            placeholder="Middle Name"
            className="mb-2" />
          
          <TextInput
            {...register("name.last")}
            placeholder="Last Name"
            className="mb-2"
            color={errors.name?.last ? "failure" : "gray"} />
          {errors.name?.last && <p className="text-red-600">{errors.name.last.message}</p>}
        </div>

        {/* Phone */}
        <TextInput
          {...register("phone")}
          placeholder="Phone"
          type="tel"
          className="mb-2"
          color={errors.phone ? "failure" : "gray"} />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

        {/* Image URL */}
        <TextInput
          {...register("image.url")}
          placeholder="Image URL"
          className="mb-2"
          color={errors.image?.url ? "failure" : "gray"} />
        {errors.image?.url && <p className="text-red-600">{errors.image.url.message}</p>}

        {/* Image Alt Text */}
        <TextInput
          {...register("image.alt")}
          placeholder="Image Alt Text"
          className="mb-2" />

        {/* Address fields */}
        <TextInput
          {...register("address.country")}
          placeholder="Country"
          className="mb-2"
          color={errors.address?.country ? "failure" : "gray"} />
        {errors.address?.country && <p className="text-red-600">{errors.address.country.message}</p>}

        <TextInput
          {...register("address.state")}
          placeholder="State"
          className="mb-2" />

        <TextInput
          {...register("address.city")}
          placeholder="City"
          className="mb-2"
          color={errors.address?.city ? "failure" : "gray"} />
        {errors.address?.city && <p className="text-red-600">{errors.address.city.message}</p>}

        <TextInput
          {...register("address.street")}
          placeholder="Street"
          className="mb-2"
          color={errors.address?.street ? "failure" : "gray"} />
        {errors.address?.street && <p className="text-red-600">{errors.address.street.message}</p>}

        <div className="flex justify-between">
          <TextInput
            {...register("address.houseNumber")}
            placeholder="House Number"
            type="number"
            className="w-1/2 mb-2"
            color={errors.address?.houseNumber ? "failure" : "gray"} />
          {errors.address?.houseNumber && <p className="text-red-600">{errors.address.houseNumber.message}</p>}

          <TextInput
            {...register("address.zip")}
            placeholder="ZIP Code"
            type="number"
            className="w-1/2 mb-2"
            color={errors.address?.zip ? "failure" : "gray"} />
          {errors.address?.zip && <p className="text-red-600">{errors.address.zip.message}</p>}
        </div>

        {/* Is Business Checkbox */}
        <div className="flex items-center mb-4">
          <Checkbox {...register("isBusiness")} />
          <label className="ml-2 text-gray-700">Is this a business account?</label>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
