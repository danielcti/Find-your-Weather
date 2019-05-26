import Card from './Card';
import React from 'react';

const CardList = (props) => {
    // console.log(props)
    let tags = (
    <div className='card-group'>
        <Card weatherInfo={props.weatherInfo[0]} pic = {props.pics[0]}/>
        <Card weatherInfo={props.weatherInfo[1]}  pic = {props.pics[1]}/>
        <Card weatherInfo={props.weatherInfo[2]}  pic = {props.pics[2]}/>
        <Card weatherInfo={props.weatherInfo[3]}  pic = {props.pics[3]}/>
        <Card weatherInfo={props.weatherInfo[4]}  pic = {props.pics[4]}/>
    </div>
)
    let cards = ''
    if(props.weatherInfo.length > 0) // para inicialmente nao mostra os cards
        cards = tags;
    return(
        <div>
            {cards}
        </div>
    )
}

export default CardList;
