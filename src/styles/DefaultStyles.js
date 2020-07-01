import styled, {createGlobalStyle} from 'styled-components';

 export const GlobalStyle = createGlobalStyle`
 
  html, body, #root {
  
    background-color: ${props => props.theme.COLOR_bg};
    color: ${props => props.theme.color_normal};
    
    
    width: 100%;
    min-width: 300px !important;
    
    height: 100%;
    
    margin:0;
    padding:0;
    
  }
  
  
  
  /* layout */
  #root {
   display: grid;
   
   
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

 export const Div = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
  
 width: 100%;
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

