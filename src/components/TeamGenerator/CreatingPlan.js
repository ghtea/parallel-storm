import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
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



const ButtonCreatePlan = styled(Button)`
  font-size: 1.2rem;
  
  width: 80px;
  height: 40px;
  
  margin-top: 10px;
  margin-bottom: 10px;
`

const DivIconWorking = styled(Div)`
  
`




 const CreatingPlan = ({addRemoveNotification, loading, ready, working, replaceWorking}) => {
  
  //{value, onChange}
  const inputPassword = useInput("");
   
  const history = useHistory(); 
  
  

  const onClick_ButtonCreatePlan = async (event) => {
    
    const idPlanTeam = getTimeStamp();
    const pwPlanTeam = generatePassword(4);  // ex: "5y7o"
     
    
    //let status = {};
    
    try {
      replaceWorking("createPlan", true);
      await axios.post (`${process.env.REACT_APP_URL_AHR}/plan-team`, {
        _id: idPlanTeam
        ,password: pwPlanTeam
      });
      
      replaceWorking("createPlan", false);
      addRemoveNotification("success", "new plan has been created!", 4000);
      //status.createPlan = true; //  작업이 잘되었다고 표시
      
      history.push(`/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`);
    }
    catch (error) {
      replaceWorking("createPlan", false)
      addRemoveNotification("error", "plan has not been created!", 4000);
      //status.createPlan = false; //  작업이 정상적으로 끝나지 않았다고 표시 (실제로 에러가 발생하지 않는다)
    }
    
  }  
  
  
  

  
  return (
  
  <DivCreatingPlan>
        
    <DivHeader>
    
      <DivTitle> Team Generator </DivTitle>
      
    </DivHeader>
    
    <DivBody>
	   
		  
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
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CreatingPlan);