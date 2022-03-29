import placesService from '../services/placesService'
import React, { useEffect , useState } from 'react'

const PlaceContext=React.createContext();
function PlaceProvider({children}) {

    const [places, setPlaces] = useState({});
    const [placeByPage, SetPlaceByPage] = useState({});
    const [idUpdate, setIdUpdate] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const [status,setStatus] = useState(false);
    const [page, setPage] = useState(1);

    const setUpdate = ()=>{
        setStatus(false);
    }

    const getPlaceUpdate = (place)=>{
        localStorage.removeItem("id_place");
        localStorage.setItem("id_place",place.id);
        setIdUpdate(place.id);
        setStatus(true);
    }
     

    const handlePage = (page) =>{
        setPage(page);
    }

    


    const executeDelete = async (id)=>{
         await placesService.remove(id);    
    }
 
    const handleDelete = (id) =>{
        try{
            executeDelete(id);
            setIdDelete(id);
        }
        catch(err){
            console.log("Fail call api "+err);
        }
    }





    useEffect( ()=>{
        const fethApi = async ()=>{
            const response= await placesService.getAll(); 
            setPlaces(response.data);
        }
        fethApi();
        },[])

    useEffect( ()=>{
        const fethApi = async (page)=>{
            const response= await placesService.getByPage(page);    
            SetPlaceByPage(response.data);
        }
        fethApi(page);
        },[page,idDelete,idUpdate,status])
   
    return (
        <PlaceContext.Provider value={{status:status,setUpdate:setUpdate,idUpdate:idUpdate, getPlaceUpdate:getPlaceUpdate, handleDelete:handleDelete,placeByPage:placeByPage.data, places:places.data, handlePage:handlePage}}>
            {children}
        </PlaceContext.Provider>
    )
}

export  {PlaceProvider,PlaceContext};
