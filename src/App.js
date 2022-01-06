import React, { useState, useEffect } from "react";
// import NavBarCom from "./components/NavBar";
// import { Container } from "react-bootstrap";
import axios from "axios";
import CardList from "./components/CardList";
import Boards from "./components/Boards";
import CreateBoard from "./components/CreateBoard";
import "./App.css";

const URL = "https://kinder-code.herokuapp.com";

function App() {
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

  console.log(boards[0].id);

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
  return (
    <body>
      <div className="App">
        <div class="page-container">
          <div class="content-container">
            <h1>Inspiration Board</h1>

            <section class="boards-container">
              <section>
                <h2 class="playful" aria-label="BOARDS">
                  <span aria-hidden="true">B</span>
                  <span aria-hidden="true">O</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">D</span>
                  <span aria-hidden="true">S</span>
                </h2>
                <ol class="boards-list">
                  <li> Pick me up!</li>
                </ol>
              </section>

              <section id="selected-boards-section">
                <h3 class="playful" aria-label="SELECT NEW BOARD">
                  <span aria-hidden="true">S</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">L</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">C</span>
                  <span aria-hidden="true">T</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">N</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">W</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">B</span>
                  <span aria-hidden="true">O</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">D</span>
                </h3>
                <p>Select a Board from the Board List!</p>
              </section>

              <section class="new-board-form-container">
                <h4 class="playful" aria-label="CREATE NEW BOARD">
                  <span aria-hidden="true">C</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">T</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">N</span>
                  <span aria-hidden="true">E</span>
                  <span aria-hidden="true">W</span>
                  <span aria-hidden="true"> </span>
                  <span aria-hidden="true">B</span>
                  <span aria-hidden="true">O</span>
                  <span aria-hidden="true">A</span>
                  <span aria-hidden="true">R</span>
                  <span aria-hidden="true">D</span>
                </h4>
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
            </section>
          </div>
          <section>
            <CardList />
          </section>
          <footer>
            <span>This is a demo! Please be gentle!</span>
          </footer>
        </div>
      </div>
    </body>
  );
}

export default App;
