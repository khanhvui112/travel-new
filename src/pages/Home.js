import React from 'react'
import BlockTitle from '../components/common/BlockTitle'
import HomeSearch from '../components/common/HomeSearch'
import Slider3D from '../components/common/Slider3D'
import SliderBlog from '../components/blogs/SliderBlog'
import SliderPlace from '../components/places/SliderPlace'
import SliderTour from '../components/tours/SliderTour'

export default function Home() {
     
    return (
        <>
            <div id="slider3d">
                <Slider3D/>
            </div>
            <HomeSearch/>
            <BlockTitle title="Tin tức & Sự kiện" subtitle="Đừng bỏ lỡ"/>
            <SliderBlog/>
            <BlockTitle title="Điểm Đến Nổi Bật" subtitle="Khám Phá"/>
            <SliderPlace/>
            <BlockTitle title="Những điểm đến hấp dẫn" subtitle="Những điểm đến hấp dẫn"/>
            <SliderTour/>
        </>
    )
}
