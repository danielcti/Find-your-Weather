import React from 'react';

const Form = (props) => {
    return(
            <div >
                <form onSubmit={props.handleSubmit}>
                <label>
                    City name:
                    <input type="search" name="name" onChange={props.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
                </form>
                <h1>{props.cityKey}</h1>
            </div>            
    )
}

export default Form;