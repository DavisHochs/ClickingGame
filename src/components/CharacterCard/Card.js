import React from "react";
import "./card.css";

const Card = ({ id, name, image, isPicked }) => (
    <div 
        className="card"
        key={id}
        data-id={id}
        name={name}
        onClick={isPicked}
        >
        <div className="card-image">
            <img src={image} alt={name} name={name}/>
        </div>
    </div>
)

export default Card;