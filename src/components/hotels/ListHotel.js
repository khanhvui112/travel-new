import React, { useEffect } from 'react'
import Hotel from './Hotel'

function ListHotel({hotels,page}) {
     useEffect(() => {
        window.scrollTo(0, 0);  
     }) 
    return (
        <div id="restaurant-grid">
            <div className="isotope-wrapper">
                <div className="row">
                { 
                            Array.from(hotels).map((hotel,index) => {
                            return (
                                     
                                    <Hotel key={index} hotel={hotel}/>
                                    
                                )
                            })
                        }                
                </div>         
            </div>
        </div>  
        
    )
}

export default ListHotel
