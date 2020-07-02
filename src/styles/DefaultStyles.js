import styled, {createGlobalStyle} from 'styled-components';


export const layout = {
 min1: 0,
 max1: 899,
 min2: 900,
 max2: 0
}

 export const GlobalStyle = createGlobalStyle`
 
  html, body, #root {
  
    background-color: ${props => props.theme.COLOR_bg};
    color: ${props => props.theme.color_normal};
    
    
    width: 100%;
    min-width: 300px !important;
    
    /*height: 100%;*/
    /* 이상하게 위의 heigth 100% 는 나중에 쓰여지는 css에 의해서 묻혀지지 않는다 !important를 써도... */
    
    margin:0;
    padding:0;
    
  }
  
  
  
  /* layout */
  #root {
   
   
  }
  
 
 @media (max-width:899px) {
  #root {
  
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
    
  }
 }
 

 @media (min-width: 900px) {
  #root {
  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  
  }
 }
  
  
 table, caption, tbody, tfoot, thead, tr, th, td {
  display: block; 
  
  width: 100%;
  
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
 }
 
`

export const Div = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
  
 width: 100%;
 /*height: 100%;*/
    /* 이상하게 위의 heigth 100% 는 나중에 쓰여지는 css에 의해서 묻혀지지 않는다 !important를 써도... */
    
 box-sizing: border-box;
`



 export const Button = styled.button`
	 cursor: pointer;
	
  border: 0;
		
`

export const Input = styled.input`
 
 border: 0;

		
`

export const A = styled.a`
	color: ${props => props.theme.color_normal};
	
	
		
`


export const Table = styled.table`
 border-collapse: collapse !important;
 border-spacing: 0;
 
`

export const Tr = styled.tr`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`

export const Td = styled.td`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`

