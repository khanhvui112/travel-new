import React, { useEffect, useRef } from 'react'
import constant from '../../../constants/constant';

function RowTour({tour,getIdUpdate,handleDelete}) {
  const elementRef = useRef();
 
  useEffect(() => {
    const divElement = elementRef.current;
    divElement.innerHTML = tour.detail
   }, [tour])
    return (
          <tr>
              <td>{tour.id}</td>
              <td>{tour.title}</td>
              <td>
              <div className="list-image">
                { 
                  Array.from(tour.imageTours).map((img,index) => {
                  return (                               
                          <a key={index} href={constant.IMAGE_TOUR+img.url}><span ><img className="image-columm" src= {constant.IMAGE_TOUR+img.url} alt={constant.IMAGE_TOUR+img.url} title={constant.IMAGE_TOUR+img.url}/>      </span></a>                                
                      )
                  })
                }      
              </div>               
              </td>  
              <td ref={elementRef}  id="blog-detail" className="row-clamp"></td>   
              <td>{tour.price}</td>         
              <td>{tour.totalDay}</td>             
              <td>{tour.totalPerson}</td>  
              <td>{tour.departure}</td>  
              <td>          
                  <button type="button"   className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg" onClick={()=>getIdUpdate(tour)}>Update</button>
                  <button  type="button" className="btn btn-danger" onClick={()=>handleDelete(tour.id)}>Delete</button>
              </td>
          </tr>
        )
}
export default RowTour
