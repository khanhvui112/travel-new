import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Banner from '../components/common/Banner';
import FormComent from '../components/common/FormComent';
import HotelDetail from '../components/hotels/HotelDetail';
import HotelSidebar from '../components/hotels/HotelSidebar';
import hotelService from '../services/hotelService'
import Share from './Share';

function SingleHotel() {
    const [hotel,SetHotel] = useState({});
    const {id} = useParams();
   

    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await hotelService.get(id);
        if(response.data.success){
            console.log(response.data.data);
            SetHotel(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }

        },[id]); 
   
 
    return (
        <>
            <Banner title={hotel.name} page="Lưu trú"/>
            <section className="tour-two tour-list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <HotelDetail hotel={hotel} />
                            <Share url={window.location.href}/>
                            <FormComent/>
                        </div>
                        <div className="col-lg-4">
                            <HotelSidebar hotel={hotel}/>
                        </div>
                    </div>     
                </div>

            </section>
        </>
        
        
    )
}

export default SingleHotel
