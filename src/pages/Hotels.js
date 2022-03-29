import React, { useEffect, useState } from 'react';
import Banner from '../components/common/Banner';
import Pagination from '../components/common/pagination';
import Search from '../components/common/Search';
import ListHotel from '../components/hotels/ListHotel';
import hotelService from '../services/hotelService';

export default function Hotels() {
    const [hotels,SetHotels] = useState({});
    const [page,setPage]=useState(1);
    const [keyword,setKeyword] = useState('');
    const getKeyWord = (keywordUpdate) =>{
         setKeyword(keywordUpdate)
    }

    const increment = (indexPage) => {
        setPage(indexPage)
      }
      

    const getByPage = async (page,keyword)=>{
        const response= await hotelService.getByPage(page,keyword);       
        SetHotels(response.data);
    }

    useEffect(()=>{
        try{
            getByPage(page,keyword);
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
    },[keyword,page])
    if(hotels.data !== undefined){
        return (
            <div>
                <Banner page="Lưu Trú" title="Lưu Trú"/>
                <section className="tour-one tour-grid" style={{paddingTop: '50px'}} >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4" >
                                <Search getKeyWord={getKeyWord}/>                      
                            </div>
                            <div className="col-lg-9 col-md-8" id="restaurant-results" >
                                <div className="tour-sorter-one">
                                    <h3><span className="total">{hotels.data.totalItem}</span> địa điểm ẩm thực được tìm thấy.</h3>
                                </div>
                                <ListHotel hotels={hotels.data.pageRespDtos} page={hotels.data.totalPage}/>
                                
                            </div>
                        </div>
                    </div>
                    <Pagination onClick={increment} totalPage={hotels.data.totalPage} />
                </section>      
            </div>
        )
    }else return ("");
}
