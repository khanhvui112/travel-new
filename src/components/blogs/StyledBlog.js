import styled from 'styled-components' 
  
const styledBlog=styled.div`
  background:url(${props=>props.image})  center/cover no-repeat;
  width:auto;
  height:300px;
`
export default styledBlog;