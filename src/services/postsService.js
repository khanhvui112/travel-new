import httpClient from '../common/http_common';
import httpClientPut from '../common/http_common_put';

const getAll=  ()=>{
    return  httpClient.get(`/posts`);
}
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/posts/page/${page}?search=${search}`);
}   
const create=(data)=>{
    return httpClient.post(`/posts`,data);
}
const get=(id)=>{
    return httpClient.get(`/posts/detail/${id}`);
}
const getTop=(id)=>{
    return httpClient.get(`/posts/top/${id}`);
}

const getDefault=(id)=>{
    return httpClient.get(`/posts/default/${id}`);
}
const update=(id,data)=>{
    return httpClientPut.put(`/posts/${id}`,data);
}

const remove=(id)=>{
     httpClient.delete(`/posts/${id}`);
}

const logger={getAll,get,getTop,getByPage,create,remove,update,getDefault}
export default logger;