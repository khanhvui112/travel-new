import React from 'react'
import Restaurant from './Restaurant'
import {useEffect} from 'react'

function ListRestaurant({restaurants}) {
     useEffect(() => {
        window.scrollTo(0, 0);  
     }) 

    return (      
        <div id="restaurant-grid">
            <div className="isotope-wrapper">
                <div className="row">
                { 
                            Array.from(restaurants).map((restaurant,index) => {
                            return (
                                     
                                    <Restaurant key={index} restaurant={restaurant}/>
                                    
                                )
                            })
                        }     
                    
                    
                </div>
                
                
                
            </div>
        </div>      
    )
}

export default ListRestaurant
