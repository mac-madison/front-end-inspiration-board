import React, { useState, useEffect } from "react";
import NavBarCom from "./components/NavBar";
import { Container } from "react-bootstrap";
import axios from "axios";
import CreateCard from "./components/CreateCard";
import "./App.css";
import Boards from "./components/Boards";
import CreateBoard from "./components/CreateBoard";

const URL = "https://kinder-code.herokuapp.com";

function App() {
  // ********** boredz ********
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);

  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    try {
      const res = await axios.get(`${URL}/boards`);
      setBoards(res.data);
      setLoading(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const addBoard = (newBoard) => {
    axios
      .post(`${URL}/boards`, {
        title: newBoard.titleData,
        owner: newBoard.ownerData,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteBoard = async (id) => {
    console.log("delete");
    await axios.delete(`${URL}/boards/${id}`);
  };

  const hideBoardForm = () => {
    return setShowBoardForm(false);
  };

  // **********CARDS******************
  const [cards, setCards] = useState([]);
  const [visibleCardForm, setVisibleCardForm] = useState(false);

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

  // it  will be passed to card component as a prop
  // onDeleteCallback -> passes deleteCard
  const deleteCard = (id) => {
    axios
      .delete(`${URL}/cards/${id}`)
      .then((response) => {
        const newCards = cards.filter((card) => card.id !== id);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // it  will be passed to card component as a prop
  // update likes
  // onToggleLike -> updateLikes

  const updateLikes = (id) => {
    const newCards = cards.map((card) => {
      if (card.card_id === id) {
        card.likes_count += 1;
        axios
          .patch(`${URL}/cards/${id}/likes`)
          .then(() => setCards(newCards))
          .catch((err) => console.log(err));
      }
      return card;
    });
  };

  // pass board_id as an argument when board component is ready
  // when click pass the id to addCard function. How?
  // CreateCard should be display only when a board is clicked
  // create a card related to that board item
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

  // we can pass this as a prop to board component
  const toggleState = () => {
    if (visibleCardForm === false) {
      setVisibleCardForm(true);
    } else {
      setVisibleCardForm(false);
    }
  };

  return (
    <body>
      <div className="App">
        <Container>
          <NavBarCom showForm={() => setShowBoardForm(true)} />
          {showBoardForm ? (
            <CreateBoard
              addBoardCallback={addBoard}
              hideBoard={hideBoardForm}
            />
          ) : null}

          <Boards boards={boards} loading={loading} deleteBoard={deleteBoard} />
        </Container>

        <div class="page-container">
          <div class="content-container">
            <h1>Inspiration Board</h1>

            <section class="boards-container">
              <section>
                <h2>Boards</h2>
                <ol class="boards-list">
                  <li onClick={() => toggleState()}> Pick me up!</li>
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

              <section class="new-board-form-container">
                {visibleCardForm ? (
                  <CreateCard addCardCallback={addCard} />
                ) : null}
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
