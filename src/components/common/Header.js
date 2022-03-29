import React,{ useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar';
import TopHeader from './TopHeader'
 

function Header() {
    const[show,Setshow] = useState(true);
    let url = useLocation().pathname;
      useEffect(() => {     
        Setshow(url==="/vi/admin")   
      }, [url]);
      
     
    return (
        !show?
        <>
            <TopHeader />
            <Navbar />
        </>:""
    )
}

export default Header
