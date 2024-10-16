import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignUpJoiSchema } from "../../validations/SignUpSchema.joi"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const nav = useNavigate();

  
  const initialFormData = {
    name: {
      first: "",
      middle: "",
      last: "",
    },
    phone: "",
    email: "",
    password: "",
    image: {
      url: "",
      alt: "",
    },
    confirmPassword: "",
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
    isBusiness: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignUpJoiSchema), 
  });

  // Función de envío del formulario
  const submit = async (form: any) => {
    try {
      
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/register",
        form
      );

      toast.success("Registration Successful");
      nav("/signin"); 
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-2" style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
      <h1 className="text-2xl">Sign Up</h1>
      <p className="text-lg">Sign Up to the amazing world of BizSnap</p>
      <form
        className="flex flex-col w-2/5 gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>

        {/* Nombre */}
        <FloatingLabel
          type="text"
          variant="outlined"
          label="First Name"
          {...register("name.first")}
          color={errors.name?.first ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.name?.first?.message}</span>

        <FloatingLabel
          type="text"
          variant="outlined"
          label="Middle Name"
          {...register("name.middle")}
          color={errors.name?.middle ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.name?.middle?.message}</span>

        <FloatingLabel
          type="text"
          variant="outlined"
          label="Last Name"
          {...register("name.last")}
          color={errors.name?.last ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.name?.last?.message}</span>

        {/* Teléfono */}
        <FloatingLabel
          type="text"
          variant="outlined"
          label="Phone"
          {...register("phone")}
          color={errors.phone ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.phone?.message}</span>

        {/* Correo Electrónico */}
        <FloatingLabel
          type="email"
          variant="outlined"
          label="Email"
          {...register("email")}
          color={errors.email ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.email?.message}</span>

        {/* Contraseña */}
        <FloatingLabel
          type="password"
          variant="outlined"
          label="Password"
          {...register("password")}
          color={errors.password ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.password?.message}</span>

        {/* Confirmar Contraseña */}
        <FloatingLabel
          type="password"
          variant="outlined"
          label="Confirm Password"
          {...register("confirmPassword")}
          color={errors.confirmPassword ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.confirmPassword?.message}</span>

        {/* Dirección */}
        <FloatingLabel
          type="text"
          variant="outlined"
          label="Street"
          {...register("address.street")}
          color={errors.address?.street ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.street?.message}</span>

        <FloatingLabel
          type="text"
          variant="outlined"
          label="City"
          {...register("address.city")}
          color={errors.address?.city ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.city?.message}</span>

        <FloatingLabel
          type="text"
          variant="outlined"
          label="State"
          {...register("address.state")}
          color={errors.address?.state ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.state?.message}</span>

        <FloatingLabel
          type="text"
          variant="outlined"
          label="Country"
          {...register("address.country")}
          color={errors.address?.country ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.country?.message}</span>

        <FloatingLabel
          type="number"
          variant="outlined"
          label="House Number"
          {...register("address.houseNumber")}
          color={errors.address?.houseNumber ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.houseNumber?.message}</span>

        <FloatingLabel
          type="number"
          variant="outlined"
          label="Zip Code"
          {...register("address.zip")}
          color={errors.address?.zip ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.address?.zip?.message}</span>

        {/* Opción de Negocio */}
        <label className="flex items-center">
          <input
            type="checkbox"
            {...register("isBusiness")}
            className="mr-2"
          />
          <span>Is Business</span>
        </label>

        <Button type="submit" disabled={!isValid}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;