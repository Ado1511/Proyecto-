import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { TextInput, Button, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import axios from "axios";
import EditUserSchema from "../../validations/EditUserSchema";

type FormData = {
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    email: string;
    phone: string;
    aboutMe: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        country: string;
        state?: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};

const EditProfile = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormData>({
        resolver: joiResolver(EditUserSchema),
        mode: "onChange",
    });

    useEffect(() => {
        if (user) {
            
            setValue("name.first", user.name.first);
            setValue("name.middle", user.name.middle || "");
            setValue("name.last", user.name.last);
            setValue("email", user.email);
            setValue("phone", user.phone || "");
            setValue("aboutMe", user.about || "");
            setValue("image.url", user.image.url || "");
            setValue("image.alt", user.image.alt || "");
            setValue("address.country", user.address.country || "");
            setValue("address.state", user.address.state || "");
            setValue("address.city", user.address.city || "");
            setValue("address.street", user.address.street || "");
            setValue("address.houseNumber", user.address.houseNumber ?? 0);
            setValue("address.zip", user.address.zip ?? 0);
        }
    }, [user, setValue]);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        if (!user) {
            toast.error("User data is not available.");
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Profile updated successfully!");
        } catch (error) {
            const err = error as any;
            console.error("Error updating profile:", err.response?.data || err.message);
            toast.error(err.response?.data.message || "Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start gap-10 px-4 m-auto" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 md:max-w-2xl">
                <h1 className="mt-2 mb-5 text-4xl font-bold text-dark">Edit Profile</h1>

                <div className="flex flex-col md:flex-row md:space-x-2">
                    <TextInput
                        {...register("name.first")}
                        placeholder="First Name"
                        className="mb-2"
                        color={errors.name?.first ? "failure" : "gray"}
                    />
                    {errors.name?.first && <p className="text-red-600">{errors.name.first.message}</p>}

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
                    {errors.name?.last && <p className="text-red-600">{errors.name.last.message}</p>}
                </div>

                <TextInput
                    {...register("email")}
                    placeholder="Email"
                    type="email"
                    className="mb-2"
                    color={errors.email ? "failure" : "gray"}
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                <TextInput
                    {...register("phone")}
                    placeholder="Phone"
                    type="tel"
                    className="mb-2"
                    color={errors.phone ? "failure" : "gray"}
                />
                {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

                <TextInput
                    {...register("aboutMe")}
                    placeholder="About Me"
                    className="mb-2"
                />
                {errors.aboutMe && <p className="text-red-600">{errors.aboutMe.message}</p>}

                <TextInput
                    {...register("image.url")}
                    placeholder="Image URL"
                    className="mb-2"
                    color={errors.image?.url ? "failure" : "gray"}
                />
                {errors.image?.url && <p className="text-red-600">{errors.image.url.message}</p>}

                <TextInput
                    {...register("address.country")}
                    placeholder="Country"
                    className="mb-2"
                    color={errors.address?.country ? "failure" : "gray"}
                />
                {errors.address?.country && <p className="text-red-600">{errors.address.country.message}</p>}

                <TextInput
                    {...register("address.city")}
                    placeholder="Address City"
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
                    placeholder="Zip Code"
                    type="number"
                    className="mb-2"
                    color={errors.address?.zip ? "failure" : "gray"}
                />
                {errors.address?.zip && <p className="text-red-600">{errors.address.zip.message}</p>}

                <Button type="submit" className="m-auto w-full md:w-[20%]" disabled={loading}>
                    {loading ? <Spinner /> : "Update Profile"}
                </Button>

                {/* Solo para depuración; puedes eliminar esto en producción */}
                <pre>{JSON.stringify(errors, null, 2)}</pre> 
            </form>
        </div>
    );
};

export default EditProfile;
