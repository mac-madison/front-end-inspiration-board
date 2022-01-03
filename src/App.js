import './App.css';

function App() {
  
  /// CREATE NEW BOARD- (TEXT INPUTS----TITLE, OWNER NAME) SUBMIT BUTTON
  //CREATE NEW CARDS - CREATE NEW CARD- (TEXT INPUTS----MESSAGE) SUBMIT BUTTON

  ///BOARDS- DINAMIC TEXT LIST( LIST OF BOARDS---EACH BOARD TITLE IS BUTTON)
  //SELECTED BOARD- WHEN BOARD TITLE CLICKED IN BOARDS---- DISPLAYS THE TITLE OF BOARD

  ///DISPLAY CARDS--- SHOWS NAME OF SELECTED BOARD--- SHOWS CARDS( LIKED(DIPLAYS LIKES), DELETED)


return (
  <div className="App">
    <header className="app-header"> <h1> Inspiration Board</h1> </header>
    <body>
      <section className="boards-header-container">
        <h2>Boards</h2>
        <div id="scroll-box-div">
          <ol id="all-board-titles"></ol>
        </div>
      </section>

      <section className= "boards-container">
        <h3>Selected Board</h3>
      </section>
      
      <section className="create-new-board-container">
        <h4>Create a New Board</h4>
      </section>
      
      <section className="create-new-card-container">
        <h5>Create a New Board</h5>
      </section>

      <footer>
        <span> This is a Demo, please be gentle!</span>
      </footer>
    
    </body>
  </div>
);
}

export default App;
