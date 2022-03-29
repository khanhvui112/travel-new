
import React, { useEffect, useState } from 'react';
import Banner from '../components/common/Banner';
import Pagination from '../components/common/pagination';
import ListRestaurant from '../components/restaurant/ListRestaurant';
import Search from '../components/common/Search';
import restaurantService  from '../services/RestaurantService';

function Restaurants() {
    const [restaurants,SetRestaurants] = useState({});
    const [page,setPage]=useState(1);
    const [keyword,setKeyword] = useState('');
    const getKeyWord = (keywordUpdate) =>{
         setKeyword(keywordUpdate)
    }
    const increment = (indexPage) => {
        setPage(indexPage)
      }
      

    const getByPage = async (page,keyword)=>{
        const response= await restaurantService.getByPage(page,keyword);      
        SetRestaurants(response.data);
    }

    useEffect(()=>{
        try{
            getByPage(page,keyword);
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
    },[keyword,page])
    
    if(restaurants.data !== undefined){
        return (
            <div>
                <Banner page="ẩm thực" title="Ẩm thực"/>
                <section className="tour-one tour-grid" style={{paddingTop: '50px'}} >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4" >
                                <Search getKeyWord={getKeyWord}/>                        
                            </div>
                            <div className="col-lg-9 col-md-8" id="restaurant-results" >
                                <div className="tour-sorter-one">
                                    <h3><span className="total">{restaurants.data.totalItem}</span> địa điểm ẩm thực được tìm thấy.</h3>
                                </div>
                                <ListRestaurant restaurants={restaurants.data.pageRespDtos} page={restaurants.data.totalPage}/>
                                
                            </div>
                        </div>
                    </div>
                    <Pagination onClick={increment} totalPage={restaurants.data.totalPage} />
                </section>      
            </div>
        )
    }else return ("");
    
}

export default Restaurants
