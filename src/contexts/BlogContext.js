 import blogsService from '../services/blogsService';
import React, { useEffect , useState } from 'react';

const BlogContext=React.createContext();
 

function BlogProvider({children}) {
    

    const [blogs, setBlogs] = useState({});

    useEffect( ()=>{
        const fethApi = async ()=>{
            const response= await blogsService.getAll();    
            setBlogs(response.data);
        }
        try{
            fethApi();
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
        },[])
 


     

    return (
        <BlogContext.Provider value={{blogs:blogs}}>
            {children}
        </BlogContext.Provider>
        
    )
}

export  {BlogProvider,BlogContext};

// useEffect( ()=>{
//     const fethApi = async ()=>{
//         const response= await blogsService.getAll();    
//         setBlogs(response.data);
//     }
//     try{
//         fethApi();
//     }
//     catch(err){
//         console.log("Fail call api "+err);
//     } 
//     },[])
