import { joiResolver } from "@hookform/resolvers/joi/src/joi.js";
import { useForm } from "react-hook-form";
import { CreateCardSchema } from "../../validations/CreateCardSchema";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FloatingLabel, Button } from "flowbite-react";

const CreateCard = () => {
    const initialCardData = {
        title: "",
        subtitle: "",
        description: "",
        phone: "",
        email: "",
        web: "",
        image: {
            url: "",
            alt: "",
        },
        address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: 0,
            zip: 0,
        },
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    const onSubmit = async (form: any) => {
        try {
            const res = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards", form);
            localStorage.setItem("res", res.data);
            axios.defaults.headers.common['x-auth-token'] = res.data;

            toast.success("A new business card has been created");
        } catch (error) {
            toast.error("Business card creation failed");
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 m-auto text-center rounded-lg shadow-lg" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
                <h1 className="text-4xl font-bold text-center text-gray-800">Card Creation</h1>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Title"
                            type="text"
                            variant="standard"
                            {...register("title")}
                            color={errors.title ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.title?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Subtitle"
                            type="text"
                            variant="standard"
                            {...register("subtitle")}
                            color={errors.subtitle ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-green-500">
                            Description
                        </label>
                        <textarea
                            id="message"
                            {...register("description")}
                            className="block p-2.5 w-[500px] h-[200px] m-auto text-sm text-gray-900 bg-orange-200
                        rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                            placeholder="Write your card description here..."
                        ></textarea>
                        <span className="mt-2 text-sm text-center text-red-800">{errors.description?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Phone"
                            type="number"
                            variant="standard"
                            {...register("phone")}
                            color={errors.phone ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.phone?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Email"
                            type="email"
                            variant="standard"
                            {...register("email")}
                            color={errors.email ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.email?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Web"
                            type="text"
                            variant="standard"
                            {...register("web")}
                            color={errors.web ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.web?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Image URL"
                            type="text"
                            variant="standard"
                            {...register("image.url")}
                            color={errors.image?.url ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.url?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Image Alt"
                            type="text"
                            variant="standard"
                            {...register("image.alt")}
                            color={errors.image?.alt ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.image?.alt?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Country"
                            type="text"
                            variant="standard"
                            {...register("address.country")}
                            color={errors.address?.country ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.country?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="City"
                            type="text"
                            variant="standard"
                            {...register("address.city")}
                            color={errors.address?.city ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.city?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="State"
                            type="text"
                            variant="standard"
                            {...register("address.state")}
                            color={errors.address?.state ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.state?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="Street"
                            type="text"
                            variant="standard"
                            {...register("address.street")}
                            color={errors.address?.street ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.street?.message}</span>
                    </div>

                    <div className="flex flex-col">
                        <FloatingLabel
                            label="House Number"
                            type="number"
                            variant="standard"
                            {...register("address.houseNumber")}
                            color={errors.address?.houseNumber ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.houseNumber?.message}</span>
                    </div>
                </div>

                <div className="flex gap-3 m-auto">
                    <div className="flex flex-col">
                        <FloatingLabel
                            label="ZIP"
                            type="number"
                            variant="standard"
                            {...register("address.zip")}
                            color={errors.address?.zip ? "error" : "success"}
                        />
                        <span className="text-sm text-red-800">{errors.address?.zip?.message}</span>
                    </div>
                </div>

                <Button type="submit" disabled={!isValid} className="m-auto w-[20%]">Create Card</Button>
                <ToastContainer />
            </form>
        </>
    );
};

export default CreateCard;
