import {useEffect, useState} from 'react';
import Board from './components/Board';
import Cards from './components/Cards';
import axios from 'axios';
import './App.css';
import CreateBoard from './components/CreateBoard';


function App() {

  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({ title: '', owner: '', id: null });


   //GET BOARDS WITH AXIOS
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards`, {
    }).then((response) => {
      setBoardsData(response.data);
    })
  }, []);

  

  const onBoardSelectCallback = (board) => { setSelectedBoard(board) };

  const boardsElements = boardsData.map((board) => {
    return (<li>
      <Board board={board} onBoardSelect={onBoardSelectCallback}></Board>
    </li>)
  });


   //POST BOARD
  const createNewBoard = (newBoard) => {
    console.log(`${process.env.REACT_APP_BACKEND_URL}/boards`)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/boards`, newBoard).then((response) => {
      console.log("Response:", response.data.board);
      const boards = [...boardsData];
      boards.push(response.data.board);
      setBoardsData(boards);
    }).catch((error) => {
      console.log('Error:', error);
      alert('Can\'t create board.');
    });
  }

  //TOGGLE FOR SETTING BOARD VISIBLE
  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleNewBoardForm = () => {setIsBoardFormVisible(!isBoardFormVisible)}




return (

  <body>
    <link href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap" rel="stylesheet"></link>
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
            <ol class="boards-list">{boardsElements}</ol>
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







            <p>{selectedBoard.id ? `${selectedBoard.title} - ${selectedBoard.owner}` : 'Select a Board from the Board List!'}</p>
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
        {isBoardFormVisible ? <CreateBoard createNewBoard={createNewBoard}></CreateBoard> : ''}
            <span onClick={toggleNewBoardForm} className='new-board-form-toggle-btn'>{isBoardFormVisible ? 'Hide New Board Form' : 'Show New Board Form'}</span>
        </section>
        {selectedBoard.board_id ? <Cards board={selectedBoard}></Cards> : ''}
        </section>
        </div>
        <footer>
          <span>This is a demo! Please be gentle!</span></footer>
          </div></div>
    </body>
  
);
}

export default App;
