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
const update=(id,data)=>{
    return httpClientPut.put(`/blogs/${id}`,data);
}

const removeBlog=(id)=>{
     httpClient.delete(`/blogs/${id}`);
}

const authenticationToken =  (token="")=>{
    return  httpClient.get(`/authentication/token/?token=${token}`);
}
const createMember=(data)=>{
    return httpClient.post(`/api/register`,data);
}
const login=(data)=>{
    return httpClient.post(`/api/login`,data);
}
const exitsEmail=(data)=>{
    return httpClient.post(`/api/exits-email`,data);
}

const logger={getAll,get,getTop,getByPage,createBlog,removeBlog,update,authenticationToken,createMember,login,exitsEmail}
export default logger;