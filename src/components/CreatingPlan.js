//import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../styles/DefaultStyles';

import axios from 'axios';
import useInput from '../tools/hooks/useInput';
import {getTimeStamp} from '../tools/vanilla/time';

//import {ahr} from '../api';
/*
dotenv.config({ 
  path: './.env' 
});
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



const reqPutPlayerMmr = (battletag) => {  
  return {
    filter: {_id: battletag }
  }
};

// "listPlayerEntry._id": { $ne: battletag }  }   //very important  // https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose


// already know there is no PlaTeam with same id
const reqCreatePlanTeam = (idPlanTeam, battletag) => {  
  return {
    filter: {_id: idPlanTeam }
    		
    ,update: {
      _id: idPlanTeam 
      ,listPlayerEntry: [ {_id: battletag} ]
    }
  }
};


 const CreatingPlan = () => {
  
  //{value, onChange}
  const inputBattletag = useInput("");
   
  const history = useHistory(); 
  
  const onClick_ButtonAddFirst = async (e) => {
    
    if (inputBattletag.value) {
      try {  
        
        const battletag = inputBattletag.value;
        
        
        
        await axios.put ("https://ahr.avantwing.com/PlayerMmr", reqPutPlayerMmr(battletag));
        // 위에서 에러가 나서 아래로 진행 안시키게 해보자
        
        
        const idPlanTeam = getTimeStamp(); 
        await axios.put( "https://ahr.avantwing.com/PlanTeam", reqCreatePlanTeam(idPlanTeam, battletag) ); // pass id of new PlanTeam to body of request
        //process.env.URL_AHR + "/PlanTeam" makes error
        
        console.log("ahr worked well")
        
        history.push(`/team-generator/${idPlanTeam}`);
      }
      catch(e) {console.log(e)}
      
      //e.preventDefault();
      //addPlayerMmr();
      //inputUrlRym.value = ''; 
      //selectRating.value = 0;
      
      
      
    } else {
      console.log("type battletag first")
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