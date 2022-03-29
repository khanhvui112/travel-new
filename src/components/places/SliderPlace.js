import React from 'react'
import Slider from "react-slick"
import Place from './Place'
import {useContext} from 'react'
import {PlaceContext} from '../../contexts/PlaceContext'
 

function SliderPlace() {
    const {places} = useContext(PlaceContext);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        arrows: true,
        slidesToScroll:3,
        centerPadding: 30,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              centerPadding: 0,
            }
          }
        ]
        
      };
  if(places!== undefined) {

      return (
          <div className="container"> 
          <Slider {...settings}>
          { 
                Array.from(places).map(
                  (place,index) => {
                    return (
                              <Place key={index}  place={place} />
                            )
                  })
            }                 
          </Slider>
        </div>
      )
  }else return ("");
}

export default SliderPlace;
