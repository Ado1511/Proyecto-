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
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search,
    );

    const user = useSelector((state: TRootState) => state.UserSlice);

    const searchCards = () => {
        return cards
            .filter((item) => item.likes && item.likes.includes(user.user!._id))
            .filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes && card.likes.includes(user.user._id);
        } else return false;
    }

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const getData = async () => {
        const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        setCards(res.data);
    };

    const likeUnlikeCard = async (card: TCard) => {
        try {
            const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/6601941691640a0b5122cdd5" + card._id);
            if (res.status === 200) {
                toast.success("Card liked/unliked");

                const index = cards.indexOf(card);
                const newCards = [...cards];
                const userId = user.user!._id;

                if (newCards[index].likes && newCards[index].likes.includes(userId)) {
                    newCards[index].likes = newCards[index].likes.filter(id => id !== userId);
                } else {
                    if (newCards[index].likes) {
                        newCards[index].likes.push(userId);
                    }
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
        <div className="flex flex-col items-center justify-start gap-10" style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Favorites</h1>
            <p className="mb-6 text-lg text-dark">Welcome to your Favorites</p>
            {user.isLoggedIn && <p className="text-lg"></p>}

            <div className="grid w-4/5 grid-cols-3 gap-3 m-auto">
                {searchCards()!.map((item: TCard) => {
                    return (
                        <Card key={item._id} className="w-4/6 m-auto">
                            <img
                                onClick={() => navToCard(item._id)}
                                src={item.image.url}
                                alt={item.image.alt}
                                className="h-[200px] object-fill"
                            />
                            <h1>{item.title}</h1>
                            <h3>{item.subtitle}</h3>
                            <p>{item.description}</p>
                            <hr />
                            {user && user.user && (
                                <div className="flex items-center justify-center space-x-4">
                                    <MdOutlinePhone
                                        size={20}
                                        className="cursor-pointer"
                                        color="black"
                                    />
                                    <TiHeartOutline
                                        size={20}
                                        className="cursor-pointer"
                                        color={isLikedCard(item) ? "red" : "black"}
                                        onClick={() => likeUnlikeCard(item)}
                                    />
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
