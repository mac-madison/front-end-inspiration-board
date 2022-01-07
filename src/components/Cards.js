import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';


const Cards = (props) => {
    const [cardsData, setCardsData] = useState([]);
    
    useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`).then((response)=> {
    setCardsData(response.data);
    }).catch((error) => {
    console.log('Error:', error);
    alert('Can\'t get cards.');
    });}, [props.board]);

    //POST CARD TO AXIOS

    const postNewCard = (message) => {
    axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.board.board_id}/cards`,
        {message}
    ).then((response) => {
    const cards = [...cardsData];
    cards.push(response.data.card);
    setCardsData(cards);
    }).catch((error) => {
    console.log('Error:', error);
    alert('Can\'t create a card.');
    });};


    //LIKE CARD TO AXIOS

    

    const addLikeToCard = (card) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.id}/like`).then((response) => {
    const newCardsData = cardsData.map((existingCard) => {
        return existingCard.id !== card.card_id ? existingCard : {...card, likes_count: card.likes_count + 1}
    });
    setCardsData(newCardsData);
    }).catch((error) => {
    console.log('Error:', error);
    alert('Can\'t like the card.');
    });};

    // DELETE CARD TO AXIOS

    const deleteCard = (card) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${card.id}`).then((response) => {
    const newCardsData = cardsData.filter((existingCard) => {
        return existingCard.id !== card.id;
    });
    setCardsData(newCardsData);
    }).catch((error) => {
    console.log('Error:', error);
    alert('Couldn\'t delete the card.');
    });};

    //RENDERS CARD ELEMENTS

    const cardElements = cardsData.map((card) => {
    return (<Card
        card={card}
        addLikeToCard={addLikeToCard}
        deleteCard={deleteCard}></Card>)
    });


    return (<section className='cards-container'>
    <section>
        <h5>Cards for {props.board.title}</h5>
        <div className='card-items-container'>
        {cardElements}
        </div>
    </section>
    </section>)
};

export default Cards;