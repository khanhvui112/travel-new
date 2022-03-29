import httpClient from '../common/http_common'

const getAll=()=>{
    return httpClient.get(`/employees`);
}  
const createEmployee=(data)=>{
    return httpClient.post(`/employees`,data);
}
const get=(id)=>{
    return httpClient.get(`/employees/${id}`);
}
const update=(data)=>{
    return httpClient.put(`/employees`,data);
}
const remove=(id)=>{
    return httpClient.delete(`/employees/${id}`);
}
export default {getAll,createEmployee,get,update,remove};