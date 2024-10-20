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

const MyCards = () => {

    const [cards, setCards] = useState<TCard[]>([]);
    const nav = useNavigate();
    const searchWord = useSelector(
        (state: TRootState) => state.SearchSlice.search,
    );

    const searchCards = () => {
        return cards.filter((item: TCard) => item.title.includes(searchWord));
    };

    const isLikedCard = (card: TCard) => {
        if (user && user.user) {
            return card.likes.includes(user.user._id);
        } else return false;
    }

    const navToCard = (id: string) => {
        nav("/card/" + id);
    };

    const getData = async () => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
        const res = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
        );
        setCards(res.data);
    };

    const likeUnlikeCard = async (card: TCard) => {
        const res = await axios.patch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
        if (res.status === 200) {

            const index = cards.indexOf(card);
            const ifLiked = cards[index].likes.includes(user.user!._id);
            const newCards = [...cards];
            if (ifLiked) {
                newCards[index].likes.splice(newCards[index].likes.indexOf(user.user!._id), 1);
                toast.success("card unliked");
            } else {
                newCards[index].likes.push(user.user!._id);
                toast.success("card liked");
            }
            setCards(newCards);
        };
    };

    const deleteCard = async (card: TCard) => {
        try {
            const res = await axios.delete("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id);
            const index = cards.indexOf(card);
            const newCards = [...cards];
            newCards.splice(index, 1);
            setCards(newCards);
            if (res) {
                toast.success("card deleted");
            };
        } catch (error) {
            toast.error("card delete failed");
        };
    };

    const navToCreate = () => {
        nav("/createcard")
    };

    useEffect(() => {
        getData();
    }, []);

    const user = useSelector((state: TRootState) => state.UserSlice);


    return (
        <div className="flex flex-col items-center justify-start gap-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
            <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">My Cards</h1>
            <p className="text-lg"> These cards were made by you</p>
            {user.isLoggedIn && <p className="text-lg"></p>}

            <div className="flex flex-wrap w-3/5 gap-1 m-auto">
                {searchCards()!.map((item: TCard) => {
                    return (
<Card key={item._id} className="w-2/6 m-auto">
    <img
        onClick={() => navToCard(item._id)}
        src={item.image.url}
        alt={item.image.alt}
        className="h-[200px] object-fill"
    />
    <h1 className="text-lg font-semibold">{item.title}</h1>
    <hr />
    <h3 className="text-md">{item.subtitle}</h3>
    <p className="text-sm">{item.description}</p>
    <hr />

    {user && user.user && (
        <div className="flex items-center justify-between mt-2 space-x-4">
            <BsPencilSquare size={20} className="cursor-pointer" />
            <TiHeartOutline
                size={20}
                className="cursor-pointer"
                color={isLikedCard(item) ? "red" : "black"}
                onClick={() => likeUnlikeCard(item)}
            />
            
            <BsTrash3Fill size={20} className="cursor-pointer" onClick={() => deleteCard(item)} />
        </div>
    )}
</Card>

                        
                    );
                })}
            </div>
            <div className="fixed flex p-3 rounded-full cursor-pointer right-10 top-20">
            <CiCirclePlus size={50} onClick={navToCreate} />
            </div>
        </div>
    );
};

export default MyCards;
