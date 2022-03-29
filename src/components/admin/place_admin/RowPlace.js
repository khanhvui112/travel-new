import React, { useContext, useEffect, useRef } from 'react'
import utils from '../../../common/utils';
import constant from '../../../constants/constant';
import { PlaceContext } from '../../../contexts/PlaceContext';
import FormPlace from './FormPlace';

function RowPlace({place}) {
    
  const {handleDelete,getPlaceUpdate} = useContext(PlaceContext);
  const elementRef = useRef();
  
     
     useEffect(() => {
      const divElement = elementRef.current;
      divElement.innerHTML =place.detail
     }, [place])
   
    return (
        <tr>
            <td>{place.id}</td>
            <td>{place.name}</td>
            <td>{place.address}</td>         
            <td>
              <div className="list-image">
                { 
                  Array.from(place.imagePlaces).map((img,index) => {
                  return (                               
                          <a href={constant.IMAGE_PLACE+img.url}><span key={index}><img className="image-columm" src= {constant.IMAGE_PLACE+img.url} alt={constant.IMAGE_PLACE+img.url} title={constant.IMAGE_PLACE+img.url}/>      </span></a>                                
                      )
                  })
                }      
              </div>
                 
            </td>   
            <td ref={elementRef} id="blog-detail" className="row-clamp"></td>          
            <td>du lịch giải trí</td>      
            <td>{utils.convertDateTime(place.createDate)}</td>  
            <td>
            <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
                    <FormPlace />
            </div>
             
          </div>
        </div>
      </div>                 
                <button type="button"   className="btn btn-primary"  data-toggle="modal" data-target=".bd-example-modal-lg"onClick={()=>getPlaceUpdate(place)}>Update</button>
                <button  type="button" className="btn btn-danger" onClick={()=>handleDelete(place.id)}>Delete</button>
            </td>
        </tr>
        
    )
}

export default RowPlace
