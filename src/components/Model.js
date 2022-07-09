import React from "react";
import "./Model.css";

function Model({ closeModel, openModel }) {
  // close (model)
  const handelCloseModel = () => {
    closeModel(false);
  };

  // className={`${openModel ? 'open' : 'close'} model-container`}
  return (
    <div className="modelOverly">
      <div className={`${openModel ? "open" : "close"} modelContainer`}>
        <button className="closeBtn" onClick={handelCloseModel}>
          X
        </button>
        <div className="title">
          <h1>congratulation</h1>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>

        <div className="footer">
          <button onClick={handelCloseModel}>cancel</button>
          <button
            onClick={() => {
              handelCloseModel();
              window.location.reload();
            }}
          >
            play again{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Model;
