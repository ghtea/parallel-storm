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

	height: 2rem;
	
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`


const InputBattletag = styled(Input)`
	width: 160px;
	height: 100%;
`



const ButtonAddFirst = styled(Button)`
  width: 60px;
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
      
      <DivId> add battletag first to start </DivId>
    </DivHeader>
    
    <DivBody>
	   
		    <DivInputAdd>
		      <InputBattletag placeholder="battletag#1234" />
		      <ButtonAddFirst> Add </ButtonAddFirst>
		    </DivInputAdd>
		    
	    
	   </DivBody>
  
  </DivCreatingPlan>
  
  )

}
  
	  

export default CreatingPlan;