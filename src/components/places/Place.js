import React from 'react'
import { Link } from 'react-router-dom'
import StyledPlace from "./StyledPlace"
import path from "../../constants/constant.js"

function Place({place}) {
    const {id,name,address,imagePlaces} = place;
    return (
        <div className="destinations-three__single">
            <StyledPlace image={path.IMAGE_PLACE+imagePlaces[0].url}>
               <div className="bg-img"/>
            </StyledPlace>
            <div className="destinations-three__content">
                <h3><Link to={`/vi/places/detail/${id}`}>{name}</Link></h3>
            </div>
            <div className="destinations-three__hover-content">
                <h3><Link to={`/vi/places/detail/${id}`}>{name}</Link></h3>    
                <p>{address}</p>
                <Link to={`/vi/places/detail/${id}`} className="destinations-three__link">
                    <i className="far fa-arrow-right"/>
                </Link>
            </div>
        </div>
        
    )
}
 

export default  Place;
