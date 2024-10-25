import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Importar el ícono de papelera

interface Card {
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
    const [cards, setCards] = useState<Card[]>([]);
    const { getValues } = useForm();
    const navigate = useNavigate();

    // Fetch cards on mount
    useEffect(() => {
        const fetchCards = async () => {
            const token = localStorage.getItem("token");
            const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards", {
                headers: {
                    'x-auth-token': token,
                },
            });
            setCards(response.data);
        };
        fetchCards();
    }, []);

    // Function to delete a card
    const deleteCard = async (cardId: string) => {
        const bizNumber = getValues("bizNumber"); // Obtener el bizNumber del formulario
        const token = localStorage.getItem("token"); // Obtener el token del local storage

        try {
            await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: {
                    'x-auth-token': token, // Añadir el token a los headers
                },
                data: {
                    bizNumber: bizNumber, // Incluir el bizNumber en el cuerpo de la solicitud
                },
            });

            toast.success("Business card has been deleted successfully");
            // Refetch cards after deletion
            setCards(prevCards => prevCards.filter(card => card._id !== cardId));
        } catch (error) {
            toast.error("Business card deletion failed");
            console.error((error as any).response?.data || error);
        }
    };

    return (
        <div>
            <h1>My Business Cards</h1>
            <div className="cards-list">
                {cards.map(card => (
                    <div key={card._id} className="card">
                        <h2>{card.title}</h2>
                        <p>{card.subtitle}</p>
                        <p>{card.description}</p>
                        <p>{card.phone}</p>
                        <p>{card.email}</p>
                        <p>{card.web}</p>
                        <img src={card.image.url} alt={card.image.alt} />
                        <div className="card-actions">
                            <button onClick={() => deleteCard(card._id)}>
                                <FaTrash /> {/* Icono de papelera */}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed-button">
                <button onClick={() => navigate('/add-card')}>Add Card</button>
            </div>
        </div>
    );
};

export default MyCards;
