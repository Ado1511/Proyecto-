import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, FloatingLabel } from 'flowbite-react';

const EditCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
                const card = res.data;

                // Establecer los valores en el formulario
                setValue('title', card.title);
                setValue('subtitle', card.subtitle);
                setValue('description', card.description);
                setValue('image', card.image.url); // Cambia esto según tu estructura
            } catch (error) {
                toast.error("Error fetching card data");
            }
        };

        fetchCardData();
    }, [id, setValue]);

    const onSubmit = async (data: any) => {
        try {
            await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, data);
            toast.success("Card updated successfully");
            navigate("/mycards"); // Redirigir a la lista de tarjetas
        } catch (error) {
            toast.error("Error updating card");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start gap-2 p-4 bg-orange-400">
            <h1 className="text-2xl">Edit Card</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-2/5 gap-4">
                <FloatingLabel label="Title" variant="standard">
                    <input type="text" {...register("title")} className="input" />
                </FloatingLabel>

                <FloatingLabel label="Subtitle" variant="standard">
                    <input type="text" {...register("subtitle")} className="input" />
                </FloatingLabel>

                <FloatingLabel label="Description" variant="standard">
                    <textarea {...register("description")} className="input" />
                </FloatingLabel>

                <FloatingLabel label="Image URL" variant="standard">
                    <input type="text" {...register("image")} className="input" />
                </FloatingLabel>

                <Button type="submit">Update Card</Button>
            </form>
        </div>
    );
};

export default EditCard;
