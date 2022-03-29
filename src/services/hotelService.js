import httpClient from '../common/http_common';
import {httpClientPut,httpClientDelete,httpClientPost} from '../common/http_common';

const getAll = ()=>{
    return  httpClient.get(`/hotels`);
}
 
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/hotels/page/${page}?search=${search}`);
}    
const create=(data)=>{
    return httpClientPost.post(`/hotels`,data);
}
const get = (id)=>{
    return httpClient.get(`/hotels/detail/${id}`);
}
const getTop=(id)=>{
    return httpClient.get(`/hotels/top/${id}`);
}

const update=(id,data)=>{
    return httpClientPut.put(`/hotels/${id}`,data);
}
const remove=(id)=>{
    return httpClientDelete.delete(`/hotels/${id}`);
}
const logger={getAll,get,getByPage,getTop,update,remove,create}
export default logger;