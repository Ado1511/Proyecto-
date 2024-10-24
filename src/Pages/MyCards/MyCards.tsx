import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { TiHeartOutline } from "react-icons/ti";
import { CiCirclePlus } from "react-icons/ci";

// Componente para cada tarjeta
const CardComponent = ({
    item,
    onEdit,
    onLike,
    onDelete,
    isLiked,
}: {
    item: TCard;
    onEdit: () => void;
    onLike: () => void;
    onDelete: () => void;
    isLiked: boolean;
}) => (
    <Card key={item._id} className="w-full m-auto sm:w-2/6"> {/* Cambiado para ser responsivo */}
        <img
            onClick={onEdit}
            src={item.image.url}
            alt={item.image.alt}
            className="h-[200px] object-cover cursor-pointer"
        />
        <h1 className="text-lg font-semibold">{item.title}</h1>
        <hr />
        <h3 className="text-md">{item.subtitle}</h3>
        <p className="text-sm">{item.description}</p>
        <hr />
        <div className="flex items-center justify-between mt-2 space-x-4">
            <BsPencilSquare size={20} className="cursor-pointer" onClick={onEdit} />
            <TiHeartOutline
                size={20}
                className="cursor-pointer"
                color={isLiked ? "red" : "black"}
                onClick={onLike}
            />
            <BsTrash3Fill size={20} className="cursor-pointer" onClick={onDelete} />
        </div>
    </Card>
);

const MyCards = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    const user = useSelector((state: TRootState) => state.UserSlice);
    const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        return user && user.user ? (card.likes ?? []).includes(user.user._id) : false;
    };

    const getData = async () => {
        setLoading(true);
        try {
            axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
            const res = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards");
            setCards(res.data);
        } catch (error) {
            toast.error("Error fetching cards");
        } finally {
            setLoading(false);
        }
    };

    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`);
            if (res.status === 200) {
                const index = cards.indexOf(card);
                const newCards = [...cards];
                const ifLiked = newCards[index].likes?.includes(user.user!._id) ?? false;
                if (ifLiked) {
                    if (newCards[index].likes) {
                        newCards[index].likes.splice(newCards[index].likes.indexOf(user.user!._id), 1);
                    }
                    toast.success("Card unliked");
                } else {
                    if (newCards[index].likes) {
                        newCards[index].likes.push(user.user!._id);
                    } else {
                        newCards[index].likes = [user.user!._id];
                    }
                    toast.success("Card liked");
                }
                setCards(newCards);
            }
        } catch (error) {
            toast.error("Error liking/unliking card");
        }
    };

    const deleteCard = async (card: TCard) => {
        try {
            const res = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards/${card._id}`);
            if (res) {
                setCards(cards.filter(c => c._id !== card._id));
                toast.success("Card deleted");
            }
        } catch (error) {
            toast.error("Card delete failed");
        }
    };

    const navToCreate = () => {
        nav("/createcard");
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start gap-10" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">My Cards</h1>
            <p className="mb-6 text-lg text-dark">These cards were made by you</p>

            <div className="w-full h-auto max-w-sm m-auto shadow-xl"> {/* Cambiado para ser responsivo */}
                {searchCards().map((item: TCard) => (
                    <CardComponent
                        key={item._id}
                        item={item}
                        onEdit={() => nav(`/editcard/${item._id}`)}
                        onLike={() => likeUnlikeCard(item)}
                        onDelete={() => deleteCard(item)}
                        isLiked={isLikedCard(item)}
                    />
                ))}
            </div>

            <div className="fixed flex p-3 rounded-full cursor-pointer right-10 top-20">
                <CiCirclePlus size={50} onClick={navToCreate} />
            </div>
        </div>
    );
};

export default MyCards;
