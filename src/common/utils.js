const convertDateTime =  (data) =>{
    const date = new Date(data);
    return  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
}
const getTime =  (data) =>{
    const date = new Date(data);
    return  date.getHours()+"h".concat(":"+date.getMinutes());
}
 

const utils={convertDateTime,getTime}
export default utils;