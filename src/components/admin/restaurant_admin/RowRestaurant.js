import React, { useEffect, useRef } from 'react'
import constant from '../../../constants/constant'
import utils from '../../../common/utils'

function RowRestaurant({restaurant,getIdUpdate,handleDelete}) {
  const elementRef = useRef();
   
     useEffect(() => {
      const divElement = elementRef.current;
      divElement.innerHTML = restaurant.detail
     }, [restaurant])
    return (
        <tr>
        <td>{restaurant.id}</td>
        <td>{restaurant.name}</td>
        <td>{restaurant.address}</td>  
        <td>
        <div className="list-image">
                { 
                  Array.from(restaurant.imageRestaurants).map((img,index) => {
                  return (                               
                          <a key={index} href={constant.IMAGE_RESTAURANT+img.url}><span key={index}><img className="image-columm" src= {constant.IMAGE_RESTAURANT+img.url} alt={constant.IMAGE_RESTAURANT+img.url} title={constant.IMAGE_RESTAURANT+img.url}/>      </span></a>                                
                      )
                  })
                }      
              </div>
        </td>  
        <td ref={elementRef} id="blog-detail" className="row-clamp"></td>        
               
        <td>{restaurant.phone}</td>      
        <td>{utils.convertDateTime(restaurant.createDate) }</td>  
        <td>
                  
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>getIdUpdate(restaurant)}>Update</button>
            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(restaurant.id)}>Delete</button>
        </td>
    </tr>
        
    )
}

export default RowRestaurant
