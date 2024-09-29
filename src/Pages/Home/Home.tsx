import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TiHeartOutline } from "react-icons/ti";

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
    <div className="flex flex-col items-center justify-start gap-2 bg-orange-300">
      <h1 className="text-2xl">Home Page</h1>
      <p className="text-lg">Welcome Home!</p>
      {user.isLoggedIn && <p className="text-lg"></p>}

      <div className="grid w-4/5 grid-cols-3 gap-3 m-auto">

        {searchCards()!.map((item: TCard) => {
          return (
            <Card
              key={item._id}
              className="w-4/6 m-auto">
              <img
                onClick={() => navToCard(item._id)}
                src={item.image.url}
                alt={item.image.alt}
                className="h-[250px] object-fill"
              />
              <h1>{item.title}</h1>
              <hr />
              <hr />
              <h3>{item.subtitle}</h3>
              <p>{item.description}</p>
              <hr />

              {user && user.user && <TiHeartOutline
                size={20}
                className="m-auto cursor-pointer"
                color={isLikedCard(item) ? "red" : "black"}
                onClick={() => likeUnlikeCard(item)}
              />}

            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
