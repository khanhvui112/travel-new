import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../components/common/Banner';
import FormComent from '../components/common/FormComent';
import RestaurantDetail from '../components/restaurant/RestaurantDetail';
import RestaurantSidebar from '../components/restaurant/RestaurantSidebar';
import Share from './Share';
import restaurantService from '../services/RestaurantService';
import constant from '../constants/constant';
import Error from './Error';
 
function SingleRestaurant() {
    const [restaurant,SetRestaurant] = useState({});
    const [restaurants,setRestaurants] = useState([]);
    const {id} = useParams();
   
    useEffect(()=>{
          
        const fetchData = async ()=>{
        const response= await restaurantService.getTop(id);
        if(response.data.success){
            setRestaurants(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }
             
            },[id]);  

            
    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await restaurantService.get(id);
        if(response.data.success){
            SetRestaurant(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }

        },[id]);
        if(restaurant.id === undefined){
 
return <Error error={constant.TOUR_NOTFOUND} />;
        }   
        else  
    return  (
        <>
            <Banner title={restaurant.name} page="Ẩm Thực"/>
            <section className="tour-two tour-list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <RestaurantDetail restaurant={restaurant} />
                            <Share url={window.location.href}/>
                            <FormComent/>
                        </div>
                        <div className="col-lg-4">
                            <RestaurantSidebar restaurants={restaurants} restaurant={restaurant}/>
                        </div>
                    </div>     
                </div>

            </section>
        </>
    )
}

export default SingleRestaurant

