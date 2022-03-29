import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import path from '../../constants/constant'
import {useEffect} from 'react'

function PlaceDetail({place}) {
    const {detail,categories,imagePlaces,name,address,price,numberLike,numberComment,numberView}={...place};
    
    useEffect(() => {
        document.querySelector('.blog-details__details').innerHTML=detail;
    }, [detail])
    const settings = {  
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll:1,
        centerPadding: 10
      };
    return (
        <>
        <div className="destinations-details__content">

            <Slider {...settings}>
            {
                imagePlaces.map((image,index) => {
                    return (
                                <div key={index} className="tour-details__gallery-image slider-image">
                                    <img src={path.IMAGE_PLACE+image.url} alt=""/>
                                </div> 
                            )
                })
            }                      
            </Slider>            
        </div>
        <h3 className="destinations-details__title">{name}</h3>
            <ul className="tour-one__meta list-unstyled">
                <li><i className="fas fa-map-marker-alt" />{address}</li>
                <li><i className="far fa-money-bill-alt" />{price}</li>
                <li><i className="far fa-comments" /> {numberComment} Bình luận</li><li><i className="fas fa-eye" />{numberView} Lượt xem</li>
                <li><Link to="#" className="add-favorite"><i className="fa fa-heart" /> <span id="Place_Likes_17">{numberLike}</span> Lượt thích</Link></li>
            </ul>
        <div className="blog-details__details"/>
        <ul className="tour-details__list list-unstyled">
            {categories.map((category,index) =>{
                return (<li key={index}><i className="fa fa-check" />{category.name}</li>)
                    })}
        </ul>
        </>
    )
}

export default PlaceDetail
