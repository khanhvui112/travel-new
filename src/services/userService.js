import httpClient from '../common/http_common';
import {httpClientGet} from '../common/http_common';

const getAll=  ()=>{
    return  httpClient.get(`/members`);
}  
const getByPage =  (page,search="")=>{
    return  httpClientGet.get(`/members/page/${page}?search=${search}`);
}  
const create=(data)=>{
    return httpClient.post(`/members`,data);
}
const get=(id)=>{
    return httpClient.get(`/members/detail/${id}`);
}
const update=(id,data)=>{
    return httpClient.put(`/members/${id}`,data);
}
const remove=(id)=>{
    return httpClient.delete(`/members/${id}`);
}
const logger={getAll,get,getByPage,remove,update,create}
export default logger;