import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import readPlanTeam from "../../redux/thunks/readPlanTeam";

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../redux/store";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';
import {generatePassword} from '../../tools/vanilla/password';

import IconWorking from '../../svgs/IconWorking'

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

const DivDescription = styled(Div)`
  color: ${props => props.theme.color_weak};
`


const DivBody = styled(Div)`
  
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`




const DivInput = styled(Div)`
  
  margin-top: 20px;
  margin-bottom: 10px;
  
	height: 36px;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`

const InputTitle = styled(Input)`
	width: 160px;
	height: 100%;
`

const ButtonCreatePlan = styled(Button)`
  width: 60px;
  height: 100%;
`





const DivIconWorking = styled(Div)`
  
`




 const CreatingPlan = ({addRemoveNotification, loading, ready, working, readPlanTeam, replaceWorking}) => {
  
  //{value, onChange}
  const inputTitle = useInput("");
  const history = useHistory(); 
  
  

  const onClick_ButtonCreatePlan = async (event) => {
    
    const idPlanTeam = getTimeStamp();
    const pwPlanTeam = generatePassword(8);  // ex: "5y7o"
    
    
    let titlePlanTeam;
    if (inputTitle.value) { titlePlanTeam = inputTitle.value }
    else {titlePlanTeam = "(no title)"}
    
    
    //let status = {};
    
    try {
      replaceWorking("createPlan", true);
      await axios.post (`${process.env.REACT_APP_URL_AHR}/plan-team`, {
        _id: idPlanTeam
        ,password: pwPlanTeam
        ,title: titlePlanTeam
      });
      
      replaceWorking("createPlan", false);
      addRemoveNotification("success", "new plan has been created!", 3000);
      //status.createPlan = true; //  작업이 잘되었다고 표시
      
      // move after 2 seconds because of preparing time
      //window.location = `/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`;
      //setTimeout( ()=>{history.push(`/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`)} , 2000)
      
      history.push(`/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`)
    }
    catch (error) {
      replaceWorking("createPlan", false)
      addRemoveNotification("error", "plan has not been created!", 3000);
      //status.createPlan = false; //  작업이 정상적으로 끝나지 않았다고 표시 (실제로 에러가 발생하지 않는다)
    }
    
  }  
  
  
  

  
  return (
  
  <DivCreatingPlan>
        
    <DivHeader>
    
      <DivTitle> Team Generator </DivTitle>
      
    </DivHeader>
    
    <DivBody>
	   
		  <DivInput>
	      <InputTitle {...inputTitle} placeholder="title of plan" />
        {working.createPlan ? 
        <ButtonCreatePlan> 
        
          <DivIconWorking>
            <IconWorking 
              width={"27px"}
              height={"24px"}
            />  
          </DivIconWorking>
          
        </ButtonCreatePlan> 
        
       : <ButtonCreatePlan onClick = {onClick_ButtonCreatePlan} > START </ButtonCreatePlan> }
        
		  </DivInput>
	    
	   </DivBody>
  
  </DivCreatingPlan>
  
  )

}
  
  
/*

<DivCreatingPlan>
        
    <DivHeader>
      <DivTitle> Team Generator </DivTitle>
      
      <DivId> add battletag first to start </DivId>
    </DivHeader>
    
    <DivBody>
	   
		    <DivInputAdd>
		      <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
		      
          {working.putPlayerMmr ? 
	        <ButtonAddFirst> 
  	        <DivIconWorking>
              <IconWorking 
                width={"27px"}
                height={"24px"}
              />  
            </DivIconWorking>
	        </ButtonAddFirst> 
	       : <ButtonAddFirst onClick = {onClick_ButtonAddFirst} > Add </ButtonAddFirst> }
        
        
		    </DivInputAdd>
		    
	    
	   </DivBody>
  
  </DivCreatingPlan>

*/


function mapStateToProps(state) { 
  return { 
    ready: state.ready 
    ,loading: state.loading
    ,working: state.working
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    ,addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CreatingPlan);