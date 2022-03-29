import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import path from '../../constants/constant';
import Slider from 'react-slick';

function TourDetail({tour}) {
    const { title,numberView,numberLike,detail
        , price, totalDay, totalPerson, departure, imageTours, subDetail } = { ...tour };
    let formatNumber = Intl.NumberFormat('en-US');
    const priceFormat = formatNumber.format(price);

    const settings = {  
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll:1,
        centerPadding: 10
      };

      useEffect(() => {
        document.querySelector('.blog-details__details').innerHTML=detail;
        document.querySelector('.sub-detail').innerHTML=subDetail;
    }, [detail,subDetail])


    return (
        <div className="tour-details__content">

            <div className="tour-two__top">
                <div className="tour-two__top-left">
                    <h3>{title}</h3>
                    <div className="tour-one__stars">
                        <span className="pl-3">0 Đánh giá</span>                        
                        <span className="pl-3"><i className="fas fa-eye mr-1" />{numberView} Lượt xem</span>
                        <Link to="#" className="add-favorite">
                            <i className="fa fa-heart ml-3"></i>
                            <span id="Tour_Likes_2">1{numberLike} Lượt thích</span>
                        </Link>
                    </div>
                </div>
                <div className="tour-two__right"><p><span>{priceFormat}</span><br/>/Người</p></div>
            </div>

            <ul className="tour-one__meta list-unstyled">
                <li><Link to="#"><i className="far fa-clock" />{totalDay}</Link></li>
                <li><Link to="#"><i className="far fa-user-circle" />{totalPerson}</Link></li>
                <li><Link to="#"><i className="far fa-bookmark" /> </Link></li>
                <li><Link to="#"><i className="fas fa-bus-alt" />{departure}</Link></li>
            </ul>
            <Slider {...settings}>
            {
                imageTours.map((image,index) => {
                    return (
                                <div key={index} className="tour-details__gallery-image slider-image">
                                    <img src={path.IMAGE_TOUR+image.url} alt=""/>
                                </div> 
                            )
                })
            }                      
            </Slider>        
            
            <div className="blog-details__details"></div>
            <div className="blog-details__details sub-detail"></div>

        </div>
    )
}

export default TourDetail
