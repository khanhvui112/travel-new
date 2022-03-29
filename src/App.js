import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,BrowserRouter,
  Route
} from 'react-router-dom';
import React,{ useEffect, useState} from 'react'
import Error from './pages/Error';
import Home from './pages/Home';
import SinglePlace from './pages/SinglePlace';  
 
import Hotel from './pages/Hotels';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import Places from './pages/Places';
import Blogs from './pages/Blogs';
import Tours from './pages/Tours';
import Vtours from './pages/Vtours';
import Restaurants from './pages/Restaurants';
import Agencies from './pages/Agencies';
import SingleBlog from './pages/SingleBlog';
import SingleTour from './pages/SingleTour';
import SingleRestaurant from './pages/SingleRestaurant';
import SingleHotel from './pages/SingleHotel';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ResetPassword from './components/common/ResetPassword';
import HotelAdmin from './components/admin/hotel_admin/HotelAdmin';
import TourAdmin from './components/admin/tour_admin/TourAdmin';
import Wrapper from './components/common/Wrapper'
import RestaurantAdmin from './components/admin/restaurant_admin/RestaurantAdmin'
import PlaceAdmin from './components/admin/place_admin/PlaceAdmin'
import BlogAdmin from './components/admin/blog_admin/BlogAdmin'
import AgencyAdmin from './components/admin/Agency_admin/AgencyAdmin'
import OrderHotel from './components/admin/order_admin/OrderHotel'
import OrderRestaurant from './components/admin/order_admin/OrderRestaurant'
import OrderTour from './components/admin/order_admin/OrderTour'
import authenticationToken from './services/athenticationService'
import UserAdmin from './components/admin/user_admin/UserAdmin'
import SingleAgency from './pages/SingleAgency'
import SingleIntroduce from './pages/SingleIntroduce'
import IntroduceAdmin from './components/admin/introduce_admin/IntroduceAdmin'
 

 
 
function App() {
  const [status, setStatus] = useState(false)
  const fethApi = async (token) => {
    const response= await authenticationToken.authenticationToken(token)    
    setStatus(response.data.data)  
}
  const token = localStorage.getItem("accessToken"); 

 

  useEffect(() => {
    try{
      fethApi(localStorage.getItem("accessToken"));
  }
  catch(err){
      console.log("Fail call api "+err);
  } 
     
  }, [token])  
  
   
  return (
    <>  
<BrowserRouter base>
    <div className="App page-wrapper">
    
        
         
        <Routes>  
        <Route path="/" element={<Wrapper />} >
        <Route path="/vi" element={<Home />} />
        <Route path="/vi/introduces/detail/:id" element={<SingleIntroduce />} />
        <Route path="/vi/places/" element={<Places />} />
        <Route path="/vi/places/detail/:id" element={<SinglePlace />} />
        <Route path="/vi/tours/" element={<Tours />} />
        <Route path="/vi/tours/detail/:id" element={<SingleTour />} />
        <Route path="/vi/blogs/" element={<Blogs />} />
        <Route path="/vi/blogs/detail/:id" element={<SingleBlog />} />
        <Route path="/vi/vtours/" element={<Vtours />} />
        <Route path="/vi/restaurants/" element={<Restaurants />} />
        <Route path="/vi/restaurants/detail/:id" element={<SingleRestaurant />} />
        <Route path="/vi/hotels/" element={<Hotel />} />
        <Route path="/vi/hotels/detail/:id" element={<SingleHotel />} />
        <Route path="/vi/agencies/detail/:id" element={<SingleAgency />} />
        <Route path="/vi/agencies/" element={<Agencies />} /> 
        <Route path="/vi/login/" element={<Login />} /> 
        
        
        <Route path="/vi/reset-password/" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<Error/>} />

        {status ? 
          (<Route path="admin" element={<Admin />} >
          <Route path="places" element={<PlaceAdmin/>}/>
          <Route path="tours" element={<TourAdmin/>}/>
          <Route path="agencies" element={<AgencyAdmin/>}/>
          <Route path="restaurants" element={<RestaurantAdmin/>}/>
          <Route path="hotels" element={<HotelAdmin/>}/>
          <Route path="blogs" element={<BlogAdmin/>}/>  
          <Route path="order-hotel" element={<OrderHotel/>}/>  
          <Route path="order-restaurant" element={<OrderRestaurant/>}/>  
          <Route path="order-tour" element={<OrderTour/>}/>  
          <Route path="user" element={<UserAdmin/>}/> 
          <Route path="introduces" element={<IntroduceAdmin/>}/> 
          
        </Route>)
        :
        <Route path="*" element={<Error/>} />}
        
        </Routes>
         
        
                
    </div>
       
    </BrowserRouter>
     
     
   
    </>
    
  );
}

export default App;
