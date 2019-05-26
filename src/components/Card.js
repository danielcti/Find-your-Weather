import React from 'react';

const Card = (props) => {
    let data = props.weatherInfo;
    let date = '';
    let min = '';
    let max = '';
    if(typeof data === 'object' ){ // porque antes disso nao vai dar pra pegar o dado de undefined
        date = data.date;
        min = data.min;
        max = data.max;
    }
    return(
            <div className="card" style={{width: '18rem', background:'linear-gradient(to right, rgb(55, 198, 223), rgb(61, 65, 239))'}}>
                <img src={props.pic} className="card-img-top" alt="." style={{height:'120px', width:'120px',margin: '20px 0px 0px 75px'}}/>
                <div className="card-body" style={{color: 'white'}}>
                    <h5 className="card-title">{date}</h5>
                    <p className="card-text">Max: {max}ºC, Min: {min}ºC</p>
                </div>
            </div>            
    )

}

export default Card;