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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

const submit = async (form: any) => {
    try {
await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/register", // Cambia esta URL según tu API
        form
    );
    toast.success("Registration Successful");
      nav("/signin"); // Redirigir al inicio de sesión después del registro
    } catch (error) {
    console.log(error);
    toast.error("Registration Failed");
    }
};

return (
    <div className="flex flex-col items-center justify-start gap-2 bg-orange-400">
            <h1 className="text-2xl">Sing Up</h1>
            <p className="text-lg"> Sing Up to the amazing world of BizSnap</p>
    <form
    className="flex flex-col w-2/5 gap-4 p-4 m-auto mt-20 rounded-lg shadow-lg"
    onSubmit={handleSubmit(submit)}
    >
    <h1 className="text-2xl font-bold text-gray-800">Sign Up</h1>

    <FloatingLabel
        type="text"
        variant="outlined"
        label="Name"
        {...register("name")}
        color={errors["name"] ? "error" : "success"}
    />
    <span className="text-sm text-red-500">{errors["name"]?.message}</span>

    <FloatingLabel
        type="email"
        variant="outlined"
        label="Email"
        {...register("email")}
        color={errors["email"] ? "error" : "success"}
    />
    <span className="text-sm text-red-500">{errors["email"]?.message}</span>

    <FloatingLabel
        type="password"
        variant="outlined"
        label="Password"
        {...register("password")}
        color={errors["password"] ? "error" : "success"}
    />
    <span className="text-sm text-red-500">{errors["password"]?.message}</span>

    <FloatingLabel
        type="password"
        variant="outlined"
        label="Confirm Password"
        {...register("confirmPassword")}
        color={errors["confirmPassword"] ? "error" : "success"}
    />
    <span className="text-sm text-red-500">{errors["confirmPassword"]?.message}</span>

    <Button type="submit" disabled={!isValid}>
        Sign Up
    </Button>
    </form>
    </div>
);
}

export default SignUp;
