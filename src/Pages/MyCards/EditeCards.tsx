import { joiResolver } from "@hookform/resolvers/joi/src/joi.js";
import { useForm } from "react-hook-form";
import { CreateCardSchema } from "../../validations/CreateCardSchema";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FloatingLabel, Button } from "flowbite-react";

interface Card {
    id: string;
    title?: string;
    subtitle?: string;
    description?: string;
    phone?: string;
    email?: string;
    web?: string;
    image?: { url?: string; alt?: string };
    address?: {
        state?: string;
        country?: string;
        city?: string;
        street?: string;
        houseNumber?: number;
        zip?: number;
    };
    bizNumber?: number;
}

type CardField = keyof Card | 'image.url' | 'address.street' | 'address.city' | 'address.state' | 'address.country' | 'address.houseNumber' | 'address.zip';

const EditCard = ({ card }: { card: Card | undefined }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Card>({
        defaultValues: card || {
            title: '',
            subtitle: '',
            description: '',
            phone: '',
            email: '',
            web: '',
            image: { url: '', alt: '' },
            address: { state: '', country: '', city: '', street: '', houseNumber: undefined, zip: undefined },
            bizNumber: undefined,
        },
        mode: "onChange",
        resolver: joiResolver(CreateCardSchema),
    });

    const onSubmit = async (form: any) => {
        if (!card?.id) {
            toast.error("Card ID is not defined");
            return; // Evitar hacer la solicitud si card.id no está definido
        }

        try {
            const filteredData = Object.fromEntries(Object.entries(form).filter(([_, v]) => v !== '' && v !== undefined));
            await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card.id}`, filteredData);
            toast.success("The business card has been updated");
        } catch (error) {
            toast.error("Business card update failed");
            console.error(error);
        }
    };

    if (!card) return <div className="text-center">Loading...</div>;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 m-auto text-center rounded-lg shadow-lg md:max-w-2xl"
            style={{ background: `linear-gradient(#ff9846, #ffffff)` }}
        >
            <h1 className="text-4xl font-bold text-gray-800">Edit Card</h1>

            <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-col w-full md:w-1/2">
                    <FloatingLabel
                        label="Title"
                        variant="standard"
                        {...register("title")}
                        color={errors.title ? "error" : "success"}
                    />
                    <span className="text-sm text-red-800">{errors.title?.message}</span>
                </div>

                <div className="flex flex-col w-full md:w-1/2">
                    <FloatingLabel
                        label="Subtitle"
                        variant="standard"
                        {...register("subtitle")}
                        color={errors.subtitle ? "error" : "success"}
                    />
                    <span className="text-sm text-red-800">{errors.subtitle?.message}</span>
                </div>
            </div>

            <div className="flex flex-col m-auto">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-center text-gray-900">Description</label>
                <textarea
                    id="description"
                    {...register("description")}
                    className="block p-2.5 w-full h-[200px] m-auto text-sm text-gray-900 bg-orange-200 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    placeholder="Write your card description here..."
                ></textarea>
                <span className="mt-2 text-sm text-center text-red-800">{errors.description?.message}</span>
            </div>

            {/* Campos adicionales */}
            {['phone', 'email', 'web'].map(field => (
                <div key={field} className="flex flex-col">
                    <FloatingLabel
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        variant="standard"
                        {...register(field as CardField)}
                        color={errors[field as keyof Card] ? "error" : "success"}
                    />
                    <span className="text-sm text-red-800">{errors[field as keyof Card]?.message}</span>
                </div>
            ))}

            {(['image.url', 'address.street', 'address.city', 'address.state', 'address.country', 'address.houseNumber', 'address.zip'] as CardField[]).map(field => (
                <div key={field} className="flex flex-col">
                    <FloatingLabel
                        label={field.replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                        variant="standard"
                        {...register(field)}
                        color={errors[field.split('.')[0] as keyof Card] ? "error" : "success"}
                    />
                    <span className="text-sm text-red-800">
                        {field.includes('.') ?
                            (errors[field.split('.')[0] as keyof Card] as any)?.[field.split('.')[1]]?.message || '' :
                            errors[field as keyof Card]?.message || ''}
                    </span>
                </div>
            ))}

            <Button type="submit" disabled={!isValid} className="m-auto w-full md:w-[20%]">Update Card</Button>
            <ToastContainer />
        </form>
    );
};

export default EditCard;
