import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";

const CardDetails = () => {
  const [card, setCard] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id,
    );
    setCard(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-10 " style={{background: `linear-gradient(#ff9846, #ffffff)`}}>
<h1 className="text-4xl font-bold"></h1>
      <h1>{card && card.title!}</h1>
      <h1>{card && card.bizNumber!}</h1>
      <h1>{card && card.phone!}</h1>
    </div>
  );
};

export default CardDetails;
