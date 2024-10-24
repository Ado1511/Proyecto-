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
    <div 
      className="flex justify-center p-4" 
      style={{ background: `linear-gradient(#ff9846, #ffffff)` }}
    >
      <Card className="w-full p-6 m-auto mt-10 mb-10 overflow-hidden border-collapse rounded-lg shadow-lg md:w-3/5 md:p-10 bg-slate-50">
        <h1 className="mb-2 text-3xl font-bold text-center md:text-4xl">{card.title}</h1>
        <h2 className="mb-4 text-xl text-center text-white md:text-2xl">{card.subtitle}</h2>
        
        <img 
          src={card.image.url} 
          alt={card.image.alt} 
          className="rounded-lg w-full h-[200px] md:h-[300px] object-cover mb-4" 
        />

        <div className="overflow-hidden">
          <p className="mt-2 text-base md:text-lg line-clamp-2">
            <strong>Description:</strong> {card.description}
          </p>
          <p className="text-base md:text-lg line-clamp-1"><strong>Phone:</strong> {card.phone}</p>
          <p className="text-base md:text-lg line-clamp-1"><strong>Email:</strong> {card.email}</p>
          
          <p className="text-base md:text-lg line-clamp-1">
            <strong>Website:</strong> 
            <a 
              href={card.web} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              {card.web}
            </a>
          </p>

          <p className="text-base md:text-lg line-clamp-1">
            <strong>Address:</strong> 
            {card.address 
              ? `${card.address.street}, ${card.address.city}, ${card.address.state}, ${card.address.zip}, ${card.address.country}` 
              : "Address not available"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CardDetails;
