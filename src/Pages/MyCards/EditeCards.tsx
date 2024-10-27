import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa"; // Importar iconos de papelera y edición
import { Card } from "flowbite-react"; // Importar componente Card de flowbite-react

interface CardData {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
    bizNumber: number;
}

const MyCards: React.FC = () => {
    const [cards, setCards] = useState<CardData[]>([]);
    const { getValues } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards", {
                headers: { 'x-auth-token': token },
            });
            setCards(response.data);
        };
        fetchCards();
    }, []);

    const deleteCard = async (cardId: string) => {
        const bizNumber = getValues("bizNumber");
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: { 'x-auth-token': token },
                data: { bizNumber: bizNumber },
            });

            toast.success("Business card has been deleted successfully");
            setCards(prevCards => prevCards.filter(card => card._id !== cardId));
        } catch (error) {
            toast.error("Business card deletion failed");
            console.error((error as any).response?.data || error);
        }
    };

    const editCard = (cardId: string) => {
        navigate(`/edit-card/${cardId}`);
    };

    return (
        <div className="flex flex-col items-center justify-start gap-10 p-4" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">My Business Cards</h1>
            <div className="grid w-full max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cards.map(card => (
                    <Card key={card._id} className="flex flex-col w-full shadow-xl">
                        <img
                            src={card.image.url}
                            alt={card.image.alt}
                            className="object-cover h-48 rounded-t-lg cursor-pointer"
                        />
                        <div className="flex flex-col flex-grow p-4">
                            <h1 className="text-lg font-semibold">{card.title}</h1>
                            <h3 className="text-sm text-gray-600">{card.subtitle}</h3>
                            <p className="flex-grow text-sm">{card.description}</p>
                            <p className="text-sm">{card.phone}</p>
                            <p className="text-sm">{card.web}</p>
                            <div className="flex items-center justify-between mt-4">
                                <button onClick={() => editCard(card._id)} className="text-blue-500">
                                    <FaEdit size={20} /> {/* Botón de editar */}
                                </button>
                                <button onClick={() => deleteCard(card._id)} className="text-red-500">
                                    <FaTrash size={20} /> {/* Botón de eliminar */}
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="fixed-button">
                <button onClick={() => navigate('/add-card')} className="p-2 text-white bg-blue-500 rounded-full shadow-md">
                    Add Card
                </button>
            </div>
        </div>
    );
};

export default MyCards;
