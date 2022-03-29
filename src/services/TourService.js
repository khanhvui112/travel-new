import httpClient from '../common/http_common';
import {httpClientGet} from '../common/http_common';

const getAll=  ()=>{
    return  httpClient.get(`/tours`);
}  
const getByPage =  (page,search="")=>{
    return  httpClientGet.get(`/tours/page/${page}?search=${search}`);
}  
const create=(data)=>{
    return httpClient.post(`/tours`,data);
}
const get=(id)=>{
    return httpClient.get(`/tours/detail/${id}`);
}
const update=(id,data)=>{
    return httpClient.put(`/tours/${id}`,data);
}
const remove=(id)=>{
    return httpClient.delete(`/tours/${id}`);
}
const logger={getAll,get,getByPage,remove,update,create}
export default logger;