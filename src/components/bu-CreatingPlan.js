import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div, Input, Button} from '../styles/DefaultStyles';

//import { gql } from "apollo-boost";
//import { useMutation } from "@apollo/react-hooks";
import useInput from '../tools/hooks/useInput';


const ADD_PLAN_TEAM = gql` 
  mutation { 
    addPlanTeam 
  } 
`;

const ADD_PLAYER_MMR = gql` 
  mutation addPlayerMmr($_id:ID!) { 
    addPlayerMmr(
      _id: $_id
    )
  } 
`;


/*
const ADD_PLAYER_TO_LIST_PLAYER_ENTRY = gql` 
 
`;
*/


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
  
  //{value, onChange}
  const inputBattletag = useInput("");
   
  const [addPlanTeam] = useMutation(ADD_PLAN_TEAM, {
    variables: { _id: inputBattletag.value}
  });
  const [addPlayerMmr] = useMutation(ADD_PLAYER_MMR, {
    variables: { _id: inputBattletag.value}
  });
  
  const onClick_ButtonAddFirst = (e) => {
    if (inputBattletag.value) {
      //e.preventDefault();
      addPlanTeam();
      addPlayerMmr();
      //inputUrlRym.value = ''; 
      //selectRating.value = 0;
    }
  }  

  
  return (
  
  <DivCreatingPlan>
        
    <DivHeader>
      <DivTitle> Team Generator </DivTitle>
      
      <DivId> add battletag first to start </DivId>
    </DivHeader>
    
    <DivBody>
	   
		    <DivInputAdd>
		      <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
		      <ButtonAddFirst onClick = {onClick_ButtonAddFirst} > Add </ButtonAddFirst>
		    </DivInputAdd>
		    
	    
	   </DivBody>
  
  </DivCreatingPlan>
  
  )

}
  
	  

export default CreatingPlan;