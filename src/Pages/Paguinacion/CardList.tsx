import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Pagination from '../Paguinacion/Pagination';

const CardList = () => {
  interface Card {
    id: number;
    title: string;
    description: string;
  }

  const [cards, setCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(15);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards");
        setCards(response.data);
        setTotalCards(response.data.length);
        console.log("Fetched Cards: ", response.data);
      } catch (error) {
        toast.error("Error fetching cards");
      }
    };

    fetchCards();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const onPageChanged = (data: { currentPage: number }) => {
    setCurrentPage(data.currentPage);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800">Business Cards</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentCards.length === 0 ? (
          <p>No hay tarjetas para mostrar.</p>
        ) : (
          currentCards.map((card) => (
            <div key={card.id} className="p-4 border rounded shadow">
              <h2 className="text-2xl">{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))
        )}
      </div>

      {totalCards > cardsPerPage && (
        <Pagination 
          totalRecords={totalCards} 
          pageLimit={cardsPerPage} 
          currentPage={currentPage} 
          onPageChanged={onPageChanged} 
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default CardList;
