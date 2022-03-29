import React from 'react'
import Banner from '../components/common/Banner';
import {useEffect, useState} from 'react';
import blogsService from '../services/blogsService';
import { useParams } from 'react-router';
import SidebarPost from './SidebarPost';
import FormComent from '../components/common/FormComent';
import constant from "../constants/constant.js";
import BlogDetail from './BlogDetail';
 
import Error from './Error';
 

function SingleBlog() {

    const [blog,setBlog] = useState({});
    const [blogs,setBlogs] = useState([]);
    const {id} = useParams();
    const {image,title}={...blog};
    
    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await blogsService.get(id);
        if(response.data.success){
            setBlog(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }

        },[id]);



    useEffect(()=>{
          
        const fetchData = async ()=>{
        const response= await blogsService.getTop(id);
        if(response.data.success){
            setBlogs(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }
             
            },[id]);           

    if(blog.id === undefined){
        return <Error error={constant.BLOG_NOTFOUND} />;
    }   
    else 
        return (
            <>
        <Banner title={title} page="Tin tức"/>
        <section className="blog-list">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="blog-details__image">
                            <img src={constant.IMAGE_BLOG+image} alt={title} className="img-fluid" />
                        </div>
                        <BlogDetail blog={blog}/>
                        <FormComent/>
                    </div>
                    <div className="col-lg-4">
                        <SidebarPost blogs={blogs} urlDetail="/vi/blogs/detail" url={constant.IMAGE_BLOG}/>
                    </div>                 
                </div>
                </div>     
        </section> 
        </>
    )
}

export default SingleBlog


