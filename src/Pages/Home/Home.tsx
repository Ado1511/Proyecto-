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

const Home = () => {
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
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
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
        newCards[index].likes.splice(index);
        toast.success("card unliked");
      } else {
        newCards[index].likes.push(user.user!._id);
        toast.success("card liked");
      }
      setCards(newCards);
    };
  };

  useEffect(() => {
    getData();
  }, []);

  const user = useSelector((state: TRootState) => state.UserSlice);

  return (
    <div className="flex flex-col items-center justify-start gap-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
      <h1 className="mt-5 mb-4 text-4xl font-bold text-dark">Home Page</h1>
      <p className="mb-6 text-lg text-dark">Welcome Home!</p>
      {user.isLoggedIn && <p className="text-lg"></p>}

      <div className="grid w-4/5 grid-cols-3 gap-2 m-auto ">

        {searchCards()!.map((item: TCard) => { 
          return (
            <Card 
              key={item._id}
              className="w-5/6 m-auto max-h-250 h-[500px] ">
              <img
                onClick={() => navToCard(item._id)}
                src={item.image.url}
                alt={item.image.alt}
                className="h-[200px] object-fill rounded-xl  max-h-200 max-w-200"
              />
              <h1>{item.title}</h1>
              <hr />
              <hr />
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <hr />

              {user && user.user && (
  <div className="flex items-center justify-center space-x-4">
    <a href={`https://web.whatsapp.com/` } target="_blank">
        <MdOutlinePhone
      size={20}
      className="cursor-pointer"
      color="black"
    />
    </a>
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

export default Home;
