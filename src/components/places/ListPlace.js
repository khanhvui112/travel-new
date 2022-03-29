import React, { useEffect, useState } from 'react'
import Pagination from '../common/pagination'
import Place from './Place'
import placesService from '../../services/placesService'


function ListPlace() {
    
    const [page,setPage]=useState(1);
    const [places, setPlaces] = useState({});
    const increment = (indexPage) => {
        setPage(indexPage)
      }
    const getByPage = async (page)=>{
        const response= await placesService.getByPage(page);    
        setPlaces(response.data);
    }

    useEffect( ()=>{
        
        try{
            getByPage(page);
        }
        catch(err){
            console.log("Fail call api "+err);
        } 
        },[page])
 



    if(places.data !== undefined) {
        return (
            <section className="destinations-three" style={{paddingTop: '50px'}}>
                <div className="container">
                    <div className="tour-sorter-one switch-view">
                        <h3><span>{places.data.totalItem}</span> Điểm tham quan</h3>
                         
                    </div>
                    <div className="row">
                        { 
                            Array.from(places.data.pageRespDtos).map((place,index) => {
                            return (
                                    <div key={index} className="col-lg-4 col-md-6">
                                        <Place place={place} />
                                    </div>
                                )
                         })
                     } 
                    </div>
                </div>
                <Pagination onClick={increment} totalPage={places.data.totalPage}/>
            </section>
        )
    }else return ("");

}

export default ListPlace
