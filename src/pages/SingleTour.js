import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Banner from '../components/common/Banner';
import tourService from '../services/TourService';
import Share from './Share';
import FormComent from '../components/common/FormComent';
import Error from './Error';
import constant from '../constants/constant';
import TourDetail from '../components/tours/TourDetail';
import TourSidebar from '../components/tours/TourSidebar';

function SingleTour() {
    const [tour,setTour] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await tourService.get(id);
        if(response.data.success){
            setTour(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }

        },[id]);
        if(tour.id === undefined){
            return <Error error={constant.TOUR_NOTFOUND} />;
        }   
        else  

    return (
        <>
            <Banner title={tour.title} page="tour du lịch"/>
            <section className="tour-two tour-list single-tour-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <TourDetail tour={tour}/>
                            <Share url={window.location.href}/>
                            <FormComent/>
                        </div>
                        <div className="col-lg-4">
                            <TourSidebar tour={tour} />
                        </div>
                    </div>     
                </div>

            </section>
        </>
    )
}

export default SingleTour
