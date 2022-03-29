import httpClient from '../common/http_common';
import httpClientPut from '../common/http_common_put';

const getAll=  ()=>{
    return  httpClient.get(`/blogs`);
}
const getByPage =  (page,search="")=>{
    return  httpClient.get(`/blogs/page/${page}?search=${search}`);
}   
const createBlog=(data)=>{
    return httpClient.post(`/blogs`,data);
}
const get=(id)=>{
    return httpClient.get(`/blogs/detail/${id}`);
}
const getTop=(id)=>{
    return httpClient.get(`/blogs/top/${id}`);
}

const getDefault=(id)=>{
    return httpClient.get(`/blogs/default/${id}`);
}
const update=(id,data)=>{
    return httpClientPut.put(`/blogs/${id}`,data);
}

const removeBlog=(id)=>{
     httpClient.delete(`/blogs/${id}`);
}

const logger={getAll,get,getTop,getByPage,createBlog,removeBlog,update,getDefault}
export default logger;