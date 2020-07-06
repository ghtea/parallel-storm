import React from 'react';
import styled from 'styled-components';


import {Div} from '../styles/DefaultStyles';




const DivLibrary = styled(Div)`
  
  @media (max-width: 540px) {
    margin-top: 200px; 
  	
	}
 
	 @media (min-width: 541px) {
	  margin-top: 120px; 
		
	 }
  
`;

function Library() {
  
  
  return (
    <DivLibrary>
    
    
   
    
    </DivLibrary>
  );
}

export default Library;



