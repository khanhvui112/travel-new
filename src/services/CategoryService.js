import httpClient from '../common/http_common';
const getAll=  ()=>{
    return  httpClient.get(`/categories`);
}  
const logger={getAll}
export default logger;
