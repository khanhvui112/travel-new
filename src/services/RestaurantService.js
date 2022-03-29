import httpClient from '../common/http_common';
import {httpClientPut,httpClientDelete,httpClientPost} from '../common/http_common';

const getAll=  ()=>{
    return  httpClient.get(`/restaurants`);
}
 
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/restaurants/page/${page}?search=${search}`);
} 
const getTop=(id)=>{
    return httpClient.get(`/restaurants/top/${id}`);
}   
const create=(data)=>{
    return httpClientPost.post(`/restaurants`,data);
}
const get=(id)=>{
    return httpClient.get(`/restaurants/detail/${id}`);
}
const update=(id,data)=>{
    return httpClientPut.put(`/restaurants/${id}`,data);
}
const remove=(id)=>{
    return httpClientDelete.delete(`/restaurants/${id}`);
}
const logger={getAll,get,getByPage,remove,update,create,getTop}
export default logger;