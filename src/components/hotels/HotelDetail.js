import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import path from '../../constants/constant'

function HotelDetail({hotel}) {
    const {name,address,numberLike,numberView,detail,image,phone,rate}=hotel;
    useEffect(() => {
        document.querySelector('.blog-details__details').innerHTML=detail;
    }, [detail])


    return (
        <div className="tour-details__content">

            <div className="tour-two__top">
                <div className="tour-two__top-left">
                    <h3>{name}</h3>
                    <div className="tour-one__stars">                     
                        <span className="pl-3"><i className="fas fa-eye mr-1" />{numberView} Lượt xem</span>
                        <span className="pl-3"><i class="fal fa-star"></i>{rate} sao</span>  
                        <Link to="#" className="add-favorite">
                            <i className="fa fa-heart ml-3"></i>
                            <span id="Tour_Likes_2">{numberLike} Lượt thích</span>
                        </Link>
                    </div>
                </div>
            </div>
            <ul className="tour-one__meta list-unstyled">
                <li><i className="fas fa-home"></i>{address}</li>
                <li><i className="fas fa-phone-alt"></i>{phone}</li>                  
            </ul>
            <div className="blog-details__image">
                <img src={path.IMAGE_HOTEL+image} alt="Khu sinh Thái Đền Hùng – Budapest" className="img-fluid"/></div> 
                <div className="blog-details__details" />    
             

        </div>
        
        
    )
}

export default HotelDetail
