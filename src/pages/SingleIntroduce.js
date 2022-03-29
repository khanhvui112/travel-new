import React from 'react'
import Banner from '../components/common/Banner';
import {useEffect, useState} from 'react';
import postsService from '../services/postsService';
import { useParams } from 'react-router';
import SidebarPost from './SidebarPost';
import FormComent from '../components/common/FormComent';
import constant from "../constants/constant.js";
import BlogDetail from './BlogDetail';
import Error from './Error';
 

function SingleIntroduce() {
    const [post,setPost] = useState({});
    const [posts,setPosts] = useState([]);
    const {id} = useParams();
    const {image,title}={...post};
    
    useEffect(()=>{
        window.scrollTo(0, 0);  
        const fetchData = async ()=>{
        const response= await postsService.get(id);
        if(response.data.success){
            setPost(response.data.data);
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
 
        const response= await postsService.getTop(id);
        if(response.data.success){
            setPosts(response.data.data);
            }                 
        }
        try{
            fetchData();
        }
        catch(error){
            console.log(error);
        }
             
            },[id]);           
            if(post.id === undefined){
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
                                    <img src={constant.IMAGE_POST+image} alt={title} className="img-fluid" />
                                </div>
                                <BlogDetail blog={post}/>
                                <FormComent/>
                            </div>
                            <div className="col-lg-4">
                                <SidebarPost blogs={posts} urlDetail="/vi/introduces/detail" url={constant.IMAGE_POST}/>
                            </div>                 
                        </div>
                        </div>     
                </section> 
                </>
            )
}

export default SingleIntroduce
