import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import { toast } from "react-toastify";
import { Card } from "flowbite-react";

const CardDetails = () => {
  const [card, setCard] = useState<TCard | null>(null);
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id
      );
      setCard(res.data);
    } catch (error) {
      toast.error("Error fetching card details");
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!card) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex justify-center " style={{ background: `linear-gradient(#ff9846, #ffffff)` }}>
      <Card className="w-3/5 p-10 m-auto mt-10 mb-10 border-collapse rounded-lg shadow-lg bg-slate-50 bt-10" >
        <h1 className="mb-2 text-4xl font-bold text-center">{card.title}</h1>
        <h2 className="mb-4 text-2xl text-center text-white">{card.subtitle}</h2>
        <img 
          src={card.image.url} 
          alt={card.image.alt} 
          className="rounded-lg h-[300px] object-cover mx-auto mb-4" 
        />
        <p className="mt-2"><strong>Description:</strong> {card.description}</p>
        <p><strong>Phone:</strong> {card.phone}</p>
        <p><strong>Email:</strong> {card.email}</p>
        <p>
          <strong>Website:</strong> 
          <a href={card.web} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {card.web}
          </a>
        </p>
        <p>
          <strong>Address:</strong> 
          {`${card.address.street}, ${card.address.city}, ${card.address.state}, ${card.address.zip}, ${card.address.country}`}
        </p>
      </Card>
    </div>
  );
};

export default CardDetails;
