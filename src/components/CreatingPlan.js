import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import addRemoveNotification from "../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../redux/store";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../styles/DefaultStyles';


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


 const CreatingPlan = ({addRemoveNotification, loading, ready, working, replaceWorking}) => {
  
  //{value, onChange}
  const inputBattletag = useInput("");
   
  const history = useHistory(); 
  
  
  
  
  const onClick_ButtonAddFirst = async (e) => {
    
    if (inputBattletag.value) {
       
        
        const battletag = inputBattletag.value;
        
        let status = {};
        
        try {
          replaceWorking("putPlayerMmr", true)
          await axios.put (`${process.env.REACT_APP_URL_AHR}/PlayerMmr`, reqPutPlayerMmr(battletag));
          
          replaceWorking("putPlayerMmr", false)
          addRemoveNotification("success", "player has been added!", 2000);
          status.mmr = true; // mmr 작업이 잘되었다고 표시
        }
        catch (error) {
          replaceWorking("putPlayerMmr", false)
          addRemoveNotification("error", "battletag is wrong", 4000);
          status.mmr = false; // mmr 작업이 정상적으로 끝나지 않았다고 표시 (실제로 에러가 발생하지 않는다)
        }
        
        
        if (status.mmr === true) {
          try {
            const idPlanTeam = getTimeStamp(); 
            await axios.put( `${process.env.REACT_APP_URL_AHR}/PlanTeam`, reqCreatePlanTeam(idPlanTeam, battletag) ); // pass id of new PlanTeam to body of request
            history.push(`/team-generator/${idPlanTeam}`);
            
            addRemoveNotification("success", "new plan has been created!", 2000);
          }
          catch(error) {
            
          }
        }
        
      
      inputBattletag.setValue("");
      
    } else { // 애초에 battletag를 입력 안했다면.
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
		      
		      {working.putPlayerMmr ? <ButtonAddFirst> working... </ButtonAddFirst> : <ButtonAddFirst onClick = {onClick_ButtonAddFirst} > Add </ButtonAddFirst> }
        
		    </DivInputAdd>
		    
	    
	   </DivBody>
  
  </DivCreatingPlan>
  
  )

}
  
	  


function mapStateToProps(state) { 
  return { 
    ready: state.ready 
    ,loading: state.loading
    ,working: state.working
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CreatingPlan);