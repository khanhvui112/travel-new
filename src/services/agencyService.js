import httpClient from '../common/http_common';
import {httpClientPut,httpClientGet,httpClientDelete,httpClientPost} from '../common/http_common';

const getAll=  ()=>{
    return  httpClient.get(`/agencies`);
}
const getTopSix = ()=>{
    return httpClient.get(`/agencies/top-six`);
}
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/agencies/page/${page}?search=${search}`);
}    
 
const create=(data)=>{
    return httpClientPost.post(`/agencies`,data);
}

const get=(id)=>{
    return httpClientGet.get(`/agencies/detail/${id}`);
}
const update=(id,data)=>{
    return httpClientPut.put(`/agencies/${id}`,data);
}
const remove=(id)=>{
    return httpClientDelete.delete(`/agencies/${id}`);
}
const logger={getAll,get,getTopSix,getByPage,create,remove,update}
export default logger;