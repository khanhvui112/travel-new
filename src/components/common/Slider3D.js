import React from 'react'
import Slider from "react-slick"

function Slider3D() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
      };
    return (
        <div className="  owl-item">
        <Slider {...settings}>
          <div className="owl-slide">
          <iframe src="//3dbooth.egal.vn/phutho/banner/1/" className="owl-slide-iframe"  title="1" ></iframe>
          </div>
          <div>
          <iframe src="//3dbooth.egal.vn/phutho/banner/2/" className="owl-slide-iframe" title="2" ></iframe>
          </div>
          <div>
          <iframe src="//3dbooth.egal.vn/phutho/banner/3/" className="owl-slide-iframe" title="3" ></iframe>
          </div>
          <div>
          <iframe src="//3dbooth.egal.vn/phutho/banner/4/" className="owl-slide-iframe" title="4" ></iframe>
          </div>
        </Slider>
      </div>
    )
}

export default Slider3D
