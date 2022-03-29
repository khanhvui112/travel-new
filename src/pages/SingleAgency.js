import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Banner from '../components/common/Banner'
import Share from './Share'
import agencyService from '../services/agencyService'
import constant from "../constants/constant.js";

function SingleAgency() {
     
    const [agency,setAgency] = useState({});
     
    const {id} = useParams();
    const {image}={...agency};
    
    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await agencyService.get(id);
        if(response.data.success){
            setAgency(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }

        },[id]);
        useEffect(() => {
            document.querySelector('.blog-details__details').innerHTML=agency.detail;
        }, [agency])



  
    return (
        <>
            <Banner title={agency&&agency.name} page="Lữ hành"/>
            <section className="tour-two tour-list destinations-details">
                 <div className="container">
                     <div className="row">
                         <div className="col-lg-8"> 
                         <div className="blog-details__image"><img src={image&&constant.IMAGE_AGENCY+image} alt="/DataFiles/2021/06/Files/20210606-191725-T98snmbU.jpeg" className="img-fluid"/></div>   
                         <div className="blog-details__content">
                            <ul className="list-unstyled blog-one__meta">
                                <li><i className="fas fa-eye"></i>{agency&&agency.numberView} Lượt xem</li><li><span className="add-favorite" data-type="Agency" data-id="2" data-lang="vi"><i className="fa fa-heart"></i> <span id="Agency_Likes_2">{agency&&agency.numberLike}</span> Lượt thích</span></li>
                            </ul>
                            <h3>{agency&&agency.name}</h3>
                            <ul className="tour-details__list list-unstyled mb-3 mt-3">
                                <li><i className="fas fa-map-marker-alt"></i>{agency&&agency.address}</li>
                                <li><i className="fas fa-phone-alt"></i> <a href="tel:(0210) 6 330 456/ 0967 105 005/ 0916 658 158">{agency&&agency.phone}</a></li>
                                <li><i className="fas fa-envelope"></i> <a href="mailto:datvietxanh.jsc@gmail.com/ datvietxanhtravel@gmail.co">{agency&&agency.urlWeb}</a></li>
                                <li><i className="fab fa-internet-explorer"></i> <a href="www.datvietxanhtravel.com" target="_blank">www.datvietxanhtravel.com</a></li>
                            </ul>
                            <div className="blog-details__details">
                            </div>
                            <Share url={window.location.href}/>
 </div>                   
                         </div>
                         <div className="col-lg-4">
                             
                         </div>   
                     </div>
                 </div>
             </section>
        </>
    )
}

export default SingleAgency
 