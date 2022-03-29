import React, { useEffect, useRef } from 'react'
import constant from '../../../constants/constant'

function RowHotel({hotel,getIdUpdate,handleDelete}) {
    const elementRef = useRef();
  
     
     useEffect(() => {
      const divElement = elementRef.current;
      divElement.innerHTML =hotel.detail
     }, [hotel])
    
    return (
        <tr>
        <td>{hotel.id}</td>
        <td>{hotel.name}</td>
        <td>{hotel.address}</td>         
        <td><div className="center-blog"><img className="image-columm" src= {constant.IMAGE_HOTEL+hotel.image} alt={hotel.name}/></div></td>  
        <td ref={elementRef} id="blog-detail" className="row-clamp"></td>       
        <td>{hotel.email}</td>      
        <td><a href={hotel.urlWeb}>{hotel.urlWeb}</a></td>  
        <td>{hotel.rate} sao</td>  
        <td>{hotel.phone}</td> 
        <td className="action">
                 
            <button type="button" className="btn btn-primary"  data-toggle="modal" data-target=".model-hotel" onClick={()=>getIdUpdate(hotel)}>Update</button>
            <button type="button" className="btn btn-danger" onClick={()=>handleDelete(hotel.id)}>Delete</button>
        </td>
    </tr>
        
    )
}

export default RowHotel
