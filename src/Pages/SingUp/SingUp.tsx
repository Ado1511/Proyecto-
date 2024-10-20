import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignUpJoiSchema } from "../../validations/SignUpSchema.joi"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  name: {
    first: string;
    middle: string;
    last: string;
  };
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
  isBusiness: boolean;
  image: {
    url: string;
    alt: string;
  };
};

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialFormData: FormData = {
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 1,
      zip: 0,
    },
    isBusiness: false,
    image: {
      url: "",
      alt: "",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignUpJoiSchema),
  });

  const submit = async (form: FormData) => {
    setLoading(true);
    console.log("Submitting Form Data:", form); // Log de los datos que se envían
    try {
      const response = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", form);
      console.log("Response:", response.data); // Log de la respuesta
      toast.success("Registration Successful");
      navigate("/signin");
    } catch (error) {
      const errorMessage = (error as any).response?.data?.message || "Registration Failed. Please try again.";
      console.error("Error in the request:", error); // Log de error completo
      console.error("Full Error Response:", (error as any).response); // Log detallado de la respuesta de error
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Resetear loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-5" style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
      <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Sign Up</h1>
      <p className="mb-6 text-lg text-dark">Join the amazing world of BizSnap</p>
      <form
        className="flex flex-col w-full h-full max-w-md p-6 mb-10 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit(submit)}
      >
        {/* Input fields with FloatingLabel */}
        {[
          { label: "First Name", name: "name.first" },
          { label: "Middle Name", name: "name.middle" },
          { label: "Last Name", name: "name.last" },
          { label: "Phone", name: "phone", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "confirmPassword", type: "password" },
          { label: "Street", name: "address.street" },
          { label: "City", name: "address.city" },
          { label: "State", name: "address.state" },
          { label: "Country", name: "address.country" },
          { label: "House Number", name: "address.houseNumber", type: "number" },
          { label: "Zip Code", name: "address.zip", type: "number" },
          { label: "Image URL (optional)", name: "image.url" },
          { label: "Image Alt Text (optional)", name: "image.alt" },
        ].map(({ label, name, type = "text" }) => {
          const nameParts = name.split('.') as [keyof FormData, keyof FormData[keyof FormData]];
          const errorMessage = (errors[nameParts[0]]?.[nameParts[1]] as any)?.message;

          return (
            <div key={name}>
              <FloatingLabel
                type={type}
                variant="outlined"
                label={label}
                {...register(name as keyof FormData)}
                color={errorMessage ? "error" : "success"}
              />
              {errorMessage && <span className="text-sm text-red-500">{errorMessage}</span>}
            </div>
          );
        })}

        {/* Business Option */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register("isBusiness")}
            className="mr-2"
          />
          <span>Is Business</span>
        </label>

        <Button type="submit" disabled={loading} className="transition duration-200 bg-blue-600 hover:bg-blue-700">
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
