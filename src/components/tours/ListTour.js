import React, { useEffect, useState } from 'react';
import Pagination from '../common/pagination';
import Tour from './Tour';
import tourService  from '../../services/TourService';

function ListTour() {
     
    const [page,setPage]=useState(1);
    const [tours, setTours] = useState({});
    const increment = (indexPage) => {
        setPage(indexPage)
      }

    const getByPage = async (page)=>{
        const response= await tourService.getByPage(page);  
        setTours(response.data);
    }

    useEffect( ()=>{

        try{
            getByPage(page);
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
        },[page])
    if(tours.data !== undefined) {
        return (
                <section className="tour-one tour-grid" style={{paddingTop: '50px'}}>
                    <div className="container">
                        <div className="row">
                        { 
                            Array.from(tours.data.pageRespDtos).map((tour,index) => {
                            return (
                                    <div key={index} className="col-lg-4 col-md-6">
                                        <Tour tour={tour}/>
                                    </div>
                                )
                            })
                        }                             
                        </div>
                    <Pagination onClick={increment} totalPage={tours.data.totalPage} />
                    </div>
                </section>
                )
    }else return ("");

}

export default ListTour

