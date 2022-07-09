import { useEffect, useState } from "react";
import "./App.css";
import Model from "./components/Model";
import SingleCard from "./components/SingleCard";
import useSuccess from "./hook/useSuccess";

const CardImage = [
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(null);
  const { openModel, setOpenModel } = useSuccess(cards, 12);
  // shuffled Card
  const shuffledCards = () => {
    const shuffledCards = [...CardImage, ...CardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisable(false);
  };

  // Start Game automatically
  useEffect(() => {
    shuffledCards();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <div className="start_turns">
          <div className="TurnsNumber">YOUR TURN ! {turns}</div>
          <button onClick={shuffledCards}>New Game</button>
        </div>

        <div className="cardGrid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable}
            />
          ))}
        </div>
      </div>
      {/* model */}
      {openModel && <Model closeModel={setOpenModel} openModel={openModel} />}
    </>
  );
}

export default App;
