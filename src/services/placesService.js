import httpClient from '../common/http_common';
import {httpClientPut,httpClientGet,httpClientDelete,httpClientPost} from '../common/http_common';

const getAll=  ()=>{
    return  httpClient.get(`/places`);
}
const getTopSix = ()=>{
    return httpClient.get(`/places/top-six`);
}
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/places/page/${page}?search=${search}`);
}    
 
const createPlace=(data)=>{
    return httpClientPost.post(`/places`,data);
}
const getTop=(id)=>{
    return httpClient.get(`/places/top/${id}`);
}

const get=(id)=>{
    return httpClientGet.get(`/places/detail/${id}`);
}
const update=(id,data)=>{
    return httpClientPut.put(`/places/${id}`,data);
}
const remove=(id)=>{
    return httpClientDelete.delete(`/places/${id}`);
}
const logger={getAll,get,getTopSix,getByPage,createPlace,remove,update,getTop}
export default logger;