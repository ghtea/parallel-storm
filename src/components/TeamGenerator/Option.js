import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import {replaceWorking} from "../../redux/store";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/IconWorking'
import IconCopy from '../../svgs/basic/IconCopy'

import {CopyToClipboard} from 'react-copy-to-clipboard';


// STYLES
const DivOption = styled(Div)`
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DivHeader = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivTitle = styled(Div)`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
`



const DivBody = styled(Div)`

	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivInputAdd = styled(Div)`
  
  margin-top: 20px;
  margin-bottom: 20px;
  
  
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

const InputName = styled(Input)`
	width: 110px;
	height: 100%;
	
	border-radius: 6px;
`

const ButtonAdd = styled(Button)`
  width: 60px;
  height: 100%;
  
  border-radius: 6px;
`



 const Option = ({
   
  workingAddPlayer 
  
  , loadingPlanTeam
  , readyPlanTeam
  
  , authority
  , planTeam
  
  , readPlanTeam
  , addRemoveNotification
  , replaceWorking
   
 }) => {

  
  
  // copy: https://www.npmjs.com/package/react-copy-to-clipboard
  
  
  return (
  <DivOption>
        
    <DivHeader>
      <DivTitle> Option </DivTitle>
      
    </DivHeader>

    
    
   <DivBody>

	   
	   
   </DivBody>
  
  </DivOption>
        
  
  )

}
  
	  
/*

 <DivInputAdd>
    <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
    <InputName {...inputName} placeholder="name" />
    
    { (authority === "viewer") && !workingAddPlayer &&
      <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "pending")} > Apply </ButtonAdd>
    }
    
    { (authority === "administrator") && !workingAddPlayer && 
      <>
        <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
      </>
    }
  </DivInputAdd>
	    
*/

function mapStateToProps(state) { 
  return { 
   
    workingAddPlayer: state.working.addPlayer
    //,workingPutPlayerMmr: state.working.putPlayerMmr
    
    //,idPlanTeam: state.idPlanTeam
    //,passwordPlanTeam: state.planTeam.password
    
    , loadingPlanTeam: state.loading.planTeam
    , readyPlanTeam: state.ready.planTeam
    
    , authority: state.authority
    , planTeam: {...state.planTeam}
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
    
    ,readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 

  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Option);