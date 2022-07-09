import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disable }) => {
  const handleClick = () => {
    if (!disable) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" style={{ cursor: !disable && "pointer" }}>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card-front" className="front" />
        <img
          src="/img/cover.png"
          alt="card-back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
