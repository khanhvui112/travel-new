import React, { useEffect, useState } from 'react'
import Pagination from '../common/pagination'
import Agency from './Agency'
import agencyService from '../../services/agencyService'


function ListAgency() {
    const [page,setPage]=useState(1);
    const [agencies, setAgencies] = useState({});
    const increment = (indexPage) => {
        setPage(indexPage)
      }

    const fethApi = async (page)=>{
        const response= await agencyService.getByPage(page);   
        setAgencies(response.data);
    }

    useEffect( ()=>{     
        try{
            fethApi(page);
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
        },[page])

    if(agencies.data !== undefined) {
    return (
        <section className="tour-two tour-list tour-list-update ">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                { 
                            Array.from(agencies.data.pageRespDtos).map((agency,index) => {
                            return (
                               
                                    <Agency key={index}  agency={agency} />
                              
                                )
                         })
                     }                 
    
                </div>
            </div>
            <Pagination onClick={increment} totalPage={agencies.data.totalPage}/>
        </div>
    </section>              
    )
} else{return ("");} 
}

export default ListAgency
