import React from 'react';
import tourService from '../services/TourService';
import  { useEffect , useState } from 'react';

const TourContext=React.createContext();
function TourProvider({children}) {
    const [tours,setTours] = useState({});


    useEffect( ()=>{
        const fethApi = async ()=>{
            const response= await tourService.getAll();    
            setTours(response.data);
        }
        fethApi();
        },[])

    return (
        <TourContext.Provider value={{tours:tours}}>
            {children}
        </TourContext.Provider>
    )
}

export  {TourContext,TourProvider};
