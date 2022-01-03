const Card = (props) => {
    return (<div className='card-item'> 
    <p className="card-message">HERE GOES DINAMICALLY POPULATED MESSAGE FOR CARD</p>
    <ul className="card-options">
        /Should display like count with magical js/
        <li><p className="likes-count">💕</p></li>
        /add on click event attribute for LIKE AND DELETE/
        <li><p className= "click-for-like">+LIKE</p></li>
        <li><p className="click-to-delete">DELETE</p></li>
    </ul>
    </div>);
};

export default Card;