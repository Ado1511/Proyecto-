import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiHeartOutline } from "react-icons/ti";
import { MdOutlinePhone } from "react-icons/md";

const Favorites = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
    const user = useSelector((state: TRootState) => state.UserSlice);

    const searchCards = () => {
        return cards.filter((item: TCard) => item.likes?.includes(user.user!._id) && item.title.toLowerCase().includes(searchWord.toLowerCase()));
    };

    const isLikedCard = (card: TCard) => {
        return user.user ? card.likes?.includes(user.user._id) : false;
    };

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const getData = async () => {
        try {
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
            setCards(res.data);
        } catch (error) {
            toast.error("Error fetching cards");
        }
    };

    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`);
            if (res.status === 200) {
                const index = cards.indexOf(card);
                const newCards = [...cards];
                const userId = user.user!._id;

                if (newCards[index].likes && newCards[index].likes.includes(userId)) {
                    newCards[index].likes = newCards[index].likes.filter(id => id !== userId);
                    toast.success("Card unliked");
                } else {
                    newCards[index].likes = newCards[index].likes ? [...newCards[index].likes, userId] : [userId];
                    toast.success("Card liked");
                }

                setCards(newCards);
            }
        } catch (error) {
            toast.error("Error liking/unliking card");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start gap-10 p-4" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Favorites</h1>
            <p className="mb-6 text-lg text-dark">Welcome to your Favorites</p>

            <div className="grid w-full max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchCards().map((item: TCard) => (
                    <Card key={item._id} className="flex flex-col w-full shadow-xl">
                        <img
                            onClick={() => navToCard(item._id)}
                            src={item.image.url}
                            alt={item.image.alt}
                            className="object-cover h-48 rounded-t-lg cursor-pointer" // Asegúrate de que la altura se mantenga
                        />
                        <div className="flex flex-col flex-grow p-4">
                            <h1 className="text-lg font-semibold">{item.title}</h1>
                            <h3 className="text-sm text-gray-600">{item.subtitle}</h3>
                            <p className="flex-grow text-sm">{item.description}</p>
                            {user && user.user && (
                                <div className="flex items-center justify-between mt-4">
                                    <a href={`https://web.whatsapp.com/`} target="_blank" rel="noopener noreferrer">
                                        <MdOutlinePhone size={20} className="cursor-pointer" color="black" />
                                    </a>
                                    <TiHeartOutline
                                        size={20}
                                        className="cursor-pointer"
                                        color={isLikedCard(item) ? "red" : "black"}
                                        onClick={() => likeUnlikeCard(item)}
                                    />
                                </div>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
