import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify";
import { CreateCardSchema } from "../../validations/CreateCardSchema"; 
import { FloatingLabel, Button } from "flowbite-react";

const EditCard = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
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

    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        defaultValues: initialCardData,
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
                const cardData = response.data;

                setValue("title", cardData.title);
                setValue("subtitle", cardData.subtitle);
                setValue("description", cardData.description);
                setValue("phone", cardData.phone);
                setValue("email", cardData.email);
                setValue("web", cardData.web);
                setValue("image.url", cardData.image.url);
                setValue("image.alt", cardData.image.alt);
                setValue("address.state", cardData.address.state);
                setValue("address.country", cardData.address.country);
                setValue("address.city", cardData.address.city);
                setValue("address.street", cardData.address.street);
                setValue("address.houseNumber", cardData.address.houseNumber);
                setValue("address.zip", cardData.address.zip);
            } catch (error) {
                toast.error("Error fetching card data");
                console.error(error);
            }
        };

        fetchCardData();
    }, [id, setValue]);

    const onSubmit = async (form: any) => {
        try {
            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, form);
            toast.success("Business card has been updated successfully");
            navigate(-1); 
        } catch (error) {
            toast.error("Business card update failed");
            console.error(error);
        }
    };

    return (
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="flex flex-col gap-4 p-4 m-auto text-center rounded-lg shadow-lg" 
                style={{ background: `linear-gradient(#ff9846, #ffffff)` }}
            >
                <h1 className="text-4xl font-bold text-center text-gray-800">Edit Card</h1>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Title"
                            type="text"
                            {...register("title")}
                            color={errors.title ? "error" : "success"}                        
                        />
                        {errors.title && <span className="text-sm text-red-800">{errors.title.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Subtitle"
                            type="text"
                            {...register("subtitle")}
                            color={errors.subtitle ? "error" : "success"}                        
                        />
                        {errors.subtitle && <span className="text-sm text-red-800">{errors.subtitle.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col m-auto">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-green-500">
                        Description
                    </label>
                    <textarea 
                        id="description" 
                        {...register("description")} 
                        className="block p-2.5 w-full md:w-[500px] h-[200px] m-auto text-sm text-gray-900 bg-orange-200
                        rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                    />
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Phone"
                            type="text"
                            {...register("phone")}
                            color={errors.phone ? "error" : "success"}                        
                        />
                        {errors.phone && <span className="text-sm text-red-800">{errors.phone.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Email"
                            type="email"
                            {...register("email")}
                            color={errors.email ? "error" : "success"}                        
                        />
                        {errors.email && <span className="text-sm text-red-800">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Website"
                            type="text"
                            {...register("web")}
                            color={errors.web ? "error" : "success"}                        
                        />
                        {errors.web && <span className="text-sm text-red-800">{errors.web.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Image URL"
                            type="text"
                            {...register("image.url")}
                            color={errors.image?.url ? "error" : "success"}                        
                        />
                        {errors.image?.url && <span className="text-sm text-red-800">{errors.image.url.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Image Alt Text"
                            type="text"
                            {...register("image.alt")}
                            color={errors.image?.alt ? "error" : "success"}                        
                        />
                        {errors.image?.alt && <span className="text-sm text-red-800">{errors.image.alt.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="State"
                            type="text"
                            {...register("address.state")}                        
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Country"
                            type="text"
                            {...register("address.country")}
                            color={errors.address?.country ? "error" : "success"}                        
                        />
                        {errors.address?.country && <span className="text-sm text-red-800">{errors.address.country.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="City"
                            type="text"
                            {...register("address.city")}
                            color={errors.address?.city ? "error" : "success"}                        
                        />
                        {errors.address?.city && <span className="text-sm text-red-800">{errors.address.city.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Street"
                            type="text"
                            {...register("address.street")}
                            color={errors.address?.street ? "error" : "success"}                        
                        />
                        {errors.address?.street && <span className="text-sm text-red-800">{errors.address.street.message}</span>}
                    </div>

                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="House Number"
                            type="number"
                            {...register("address.houseNumber")}
                            color={errors.address?.houseNumber ? "error" : "success"}                        
                        />
                        {errors.address?.houseNumber && <span className="text-sm text-red-800">{errors.address.houseNumber.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-3 m-auto md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2">
                        <FloatingLabel
                            variant={"standard"} label="Zip Code"
                            type="number"
                            {...register("address.zip")}
                        />
                    </div>
                </div>

                <Button type="submit" className="m-auto w-full md:w-[20%]" disabled={!isValid}>
                    Update Card
                </Button>

                <ToastContainer />
            </form>
        </>
    );
};

export default EditCard;
