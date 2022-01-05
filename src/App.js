import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateCard from "./components/CreateCard";
import "./App.css";

const URL = "https://kinder-code.herokuapp.com";

function App() {
  /// CREATE NEW BOARD- (TEXT INPUTS----TITLE, OWNER NAME) SUBMIT BUTTON
  //CREATE NEW CARDS - CREATE NEW CARD- (TEXT INPUTS----MESSAGE) SUBMIT BUTTON

  ///BOARDS- DINAMIC TEXT LIST( LIST OF BOARDS---EACH BOARD TITLE IS BUTTON)
  //SELECTED BOARD- WHEN BOARD TITLE CLICKED IN BOARDS---- DISPLAYS THE TITLE OF BOARD

  ///DISPLAY CARDS--- SHOWS NAME OF SELECTED BOARD--- SHOWS CARDS( LIKED(DIPLAYS LIKES), DELETED)

  // CARDS
  const [cards, setCards] = useState([]);

  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    axios
      .get(`${URL}/cards`)
      .then((res) => {
        const newCards = res.data.map((card) => {
          return {
            card_id: card.card_id,
            message: card.message,
            likes_count: card.likes_count,
            board_id: card.board_id,
          };
        });
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // pass board_id as an argument when board component is ready
  // when click pass the
  const addCard = ({ message, board_id }) => {
    board_id = 1;
    axios
      .post(`${URL}/boards/${board_id}/cards`, {
        message,
        likes_count: 0,
        board_id,
      })
      .then((res) => {
        const newCard = {
          id: res.data.card_id,
          likes_count: res.data.likes_count,
          message: res.data.message,
          board_id: res.data.board_id,
        };
        setCards([...cards, newCard]);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <body>
      <div className="App">
        <div class="page-container">
          <div class="content-container">
            <h1>Inspiration Board</h1>

            <section class="boards-container">
              <section>
                <h2>Boards</h2>
                <ol class="boards-list">
                  <li>
                    <div>Pick-me-up Quotes</div>
                  </li>
                </ol>
              </section>

              <section id="selected-boards-section">
                <h3>Selected Board</h3>
                <p>Select a Board from the Board List!</p>
              </section>

              <section class="new-board-form-container">
                <h4>Create a New Board</h4>
                <form class="new-board-form">
                  <label>Title</label>
                  <input type="text" class="invalid-form-input" value="" />
                  <label>Owner's Name</label>
                  <input type="text" class="invalid-form-input" value="" />
                  <p>Preview: - </p>
                  <input
                    type="Submit"
                    disabled=""
                    class="new-board-form-submit-btn"
                  />
                </form>
                <span class="new-board-form-toggle-btn">
                  Hide New Board Form
                </span>
              </section>

              <section>
                <CreateCard addCardCallback={addCard} />
              </section>
            </section>
          </div>
          <footer>
            <span>This is a demo! Please be gentle!</span>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
