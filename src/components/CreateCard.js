import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./CreateCard.css";

const URL = "https://kinder-code.herokuapp.com";

const CreateCard = ({ addCardCallback, board_id }) => {
  // get id from clickEvent on board , pass this value as board_id

  board_id = 1;
  const [newCardData, setNewCardData] = useState({
    board_id: "",
    message: "",
  });

  const inputValid = () => {
    return newCardData.message.length <= 40;
  };

  const onMessageChange = (event) => {
    setNewCardData({
      ...newCardData,
      message: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!inputValid()) {
      return;
    }
    // console.log("me");
    // create a new card
    addCardCallback(newCardData);
    // reset state
    setNewCardData({
      board_id: "",
      message: "",
    });
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <h2>Create a New Card</h2>

        <label htmlFor="message">Message</label>
        <input
          type="text"
          value={newCardData.message}
          onChange={onMessageChange}
        />
        <p> Preview: {newCardData.message} </p>
        <button type="submit">submit</button>
      </form>
    </section>
  );
};

CreateCard.propTypes = {
  board_id: PropTypes.number.isRequired,
  addCardCallback: PropTypes.func.isRequired,
};

export default CreateCard;
