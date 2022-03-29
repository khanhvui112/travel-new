import httpClient from '../common/http_common';
import {httpClientPut,httpClientDelete,httpClientPost} from '../common/http_common';
 
const getOrderTourByPage =  (page,search="")=>{
    return  httpClient.get(`/order-tour/page/${page}?search=${search}`);
}    
const getOrderRestaurantByPage =  (page,search="")=>{
    return  httpClient.get(`/order-restaurant/page/${page}?search=${search}`);
} 
const getOrderHotelByPage =  (page,search="")=>{
    return  httpClient.get(`/order-hotel/page/${page}?search=${search}`);
} 


const createTourService=(data)=>{
    return httpClientPost.post(`/order-tour`,data); 
}
const updateTourService=(id)=>{
    return httpClientPut.put(`/order-tour/${id}`);
}
const removeTourService=(id)=>{
    return httpClientDelete.delete(`/order-tour/${id}`);
}



const createRestaurantService=(data)=>{
    return httpClientPost.post(`/order-restaurant`,data);
}
const updateRestaurantService=(id)=>{
    return httpClientPut.put(`/order-restaurant/${id}`);
}
const removeRestaurantService=(id)=>{
    return httpClientDelete.delete(`/order-restaurant/${id}`);
}



const createHotelService=(data)=>{
    return httpClientPost.post(`/order-hotel`,data);
}

const updateHotelService=(id)=>{
    return httpClientPut.put(`/order-hotel/${id}`);
}
const removeHotelService=(id)=>{
    return httpClientDelete.delete(`/order-hotel/${id}`);
}




const createPlaceService=(data)=>{
    return httpClientPost.post(`/order-place`,data);
}
 
 
const update=(id,data)=>{
    return httpClientPut.put(`/places/${id}`,data);
}
const remove=(id)=>{
    return httpClientDelete.delete(`/places/${id}`);
}
const logger={createHotelService,
            createTourService,remove,update,
            createRestaurantService,createPlaceService,
            getOrderRestaurantByPage,getOrderHotelByPage,
            removeHotelService,
            updateHotelService,
            getOrderTourByPage,updateRestaurantService,updateTourService,
            removeTourService,removeRestaurantService}
export default logger;