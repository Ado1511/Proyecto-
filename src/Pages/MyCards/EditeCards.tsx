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
                console.log(`Fetching card data for ID: ${id}`); 
                const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
                const card = res.data;

                
                console.log("Fetched card data:", card);
                setValue('title', card.title);
                setValue('subtitle', card.subtitle);
                setValue('description', card.description);
                setValue('phone', card.phone);
                setValue('email', card.email);
                setValue('web', card.web);
                setValue('image.url', card.image.url);
                setValue('image.alt', card.image.alt);
                setValue('address.state', card.address.state);
                setValue('address.country', card.address.country);
                setValue('address.city', card.address.city);
                setValue('address.street', card.address.street);
                setValue('address.houseNumber', card.address.houseNumber);
                setValue('address.zip', card.address.zip);
            } catch (error) {
                console.error("Error fetching card data:", error); // Log de error
                toast.error("Error fetching card data");
            }
        };

        fetchCardData();
    }, [id, setValue]);

    const onSubmit = async (data: any) => {
        try {
            await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, data, {
                headers: {
                    'x-auth-token': 'YOUR_AUTH_TOKEN' // Asegúrate de reemplazar esto con el token correcto
                }
            });
            toast.success("Card updated successfully");
            navigate("/mycards"); 
        } catch (error) {
            console.error("Error updating card:", error); 
            toast.error("Error updating card");
        }
    };

    return (
        <div className="flex flex-col items-center justify-start gap-2 p-4" style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Edit Card</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-2/5 gap-4">
                <FloatingLabel label="Title" variant="standard">
                    <input type="text" {...register("title")} className="input" required />
                </FloatingLabel>
                
                <Button type="submit">Update Card</Button>
            </form>
        </div>
    );
};

export default EditCard;
