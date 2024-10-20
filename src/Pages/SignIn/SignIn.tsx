/* eslint-disable tailwindcss/classnames-order */
import { joiResolver } from "@hookform/resolvers/joi";
import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SignInJoiSchema } from "../../validations/SigninSchema.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { decode } from "../../Services/tokenService";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(SignInJoiSchema),
  });

  const submit = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );

      localStorage.setItem("token", token.data);
      const id = decode(token.data)._id;

      console.log("Token received: ", token.data);
      console.log("Decoded Token: ", decode(token.data));
      console.log(id);

      axios.defaults.headers.common["x-auth-token"] = token.data;
      const user = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id,
      );
      dispatch(userActions.login(user.data));
      toast.success("Sign In Successful");
      nav("/");
    } catch (error: any) {
      console.log("Error during sign in:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Sign In Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-2 mb-20" style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
      <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Sign In</h1>
      <p className="mb-6 text-lg text-dark">Sign In to the amazing world of BizSnap</p>
      <form
        className="flex flex-col w-2/5 gap-4 p-4 m-auto mt-20 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>

        <div className="my-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-2 border-2 rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span className="text-sm text-red-500">{errors.email?.message}</span>
        </div>

        <div className="my-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full p-2 border-2 rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span className="text-sm text-red-500">{errors.password?.message}</span>
        </div>

        <Button type="submit" disabled={!isValid} className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
