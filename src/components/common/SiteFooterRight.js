import React from 'react'
import { Link } from 'react-router-dom'
import  { useEffect , useState } from 'react'
import placesService from '../../services/placesService'
import path from '../../constants/constant'

function SiteFooterRight() {
   
  
  const [places,setPlaces] = useState({});
    useEffect( ()=>{
        const fethApi = async ()=>{
            const response= await placesService.getTopSix();    
            setPlaces(response.data);
        }
        fethApi();
        },[])
 
  if(places.data!==undefined){
    return (

      <div className="col-md-4">
        <h3 className="footer-widget__title">Địa điểm nổi bật</h3>
        <ul className="footer-widget__gallery-list list-unstyled">
        {
          places.data.map((place,index)=>{
            return (
              <li key={index}>
                <Link to={`/vi/places/detail/${place.id}`} title="Căn cứ Tiên Động">
                  <div style={{ width: '100%  ', height: '76px', backgroundImage: `url(${path.IMAGE_PLACE+place.imagePlaces[0].url})` }} className="bg-img" />
                </Link>
              </li>
            )
          })
          
   
        }
          
        </ul>
      </div>
  
    )
  }return("");
  
}

export default SiteFooterRight
