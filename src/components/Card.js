import React from "react";

const Card = (props) => {

return (
    <div className='card-item'> 
    <p className="card-message">{props.card.message}</p>
    <ul className="card-options">
        <li><p className="likes-count">{props.card.likes_count}💕</p></li>
        <li><p className="click-to-like" onClick={() => props.addLikeToCard(props.card)}>+1</p></li>
        <li><p className="click-to-delete" onClick={() => props.deleteCard(props.card)}>DELETE</p></li>
    </ul>
    </div>);
};


export default Card;