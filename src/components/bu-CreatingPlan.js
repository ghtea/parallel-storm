import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div, Input, Button} from '../styles/DefaultStyles';



const DivCreatingPlan = styled(Div)`
  grid-area: add;
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;


const DivHeader = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivTitle = styled(Div)`
  font-size: 1.6rem;
`
const DivId = styled(Div)`
  color: ${props => props.theme.color_weak};
`


const DivBody = styled(Div)`

	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivInputAdd = styled(Div)`
	height: 60px;

	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`

const DivInput = styled(Div)`
	width: 180px;
	
	height: 100%;
	display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const InputPw = styled(Input)`
	height: 1.5rem;
  
`



const ButtonAddFirst = styled(Button)`
  width: 80px;
  height: 100%;
`

const DivCaution = styled(Div)`

	margin-top: 5px;
	
	font-size: 0.9rem;
	color: ${props => props.theme.color_weak};
`



 const CreatingPlan = () => {
   
  
  
  return (
  
  <DivCreatingPlan>
        
    <DivHeader>
      <DivTitle> Team Generator </DivTitle>
      
      <DivId> add battletag first to create plan</DivId>
    </DivHeader>
    
    <DivBody>
	    <DivInputAdd>
	  
		    <DivInput>
		      <InputPw placeholder="sharing-password" />
		      <InputPw placeholder="sharing-password again" />
		    </DivInput>
		    
		    <ButtonAddFirst> Create Plan </ButtonAddFirst>
		     
	    </DivInputAdd>
	    
	    <DivCaution> * developer can see password </DivCaution>
	   </DivBody>
  
  </DivCreatingPlan>
  
  )

}
  
	  

export default CreatingPlan;