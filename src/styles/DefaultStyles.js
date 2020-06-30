import styled, {createGlobalStyle} from 'styled-components';

 const GlobalStyle = createGlobalStyle`
 
  html, body, #root {
  
    background-color: ${props => props.theme.COLOR_bg};
    color: ${props => props.theme.color_normal};
    
    
    width: 100%;
    min-width: 300px !important;
    
    height: 100%;
    
    
  }
  
  #root {
   display: flex;
  }
  
 
 
 @media (max-width:540px) {
  #root {
    
    flex-direction: column;
  }
 }
 

 @media (min-width: 541px) {
  #root {
    flex-direction: row; 
  }
 }
  
`

 const Div = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
  
`



 const Button = styled.button`
	border: none;
	cursor: pointer;
	

		
`

const A = styled.a`
	color: ${props => props.theme.color_normal};
	
	
		
`

export {GlobalStyle, Div, Button, A};
