import styled from 'styled-components'; 
  
const styledPlace=styled.div`
  background:url(${props=>props.image})  center/cover no-repeat;
  width:100%;
  height:415px;
`
export default styledPlace;