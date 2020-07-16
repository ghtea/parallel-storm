import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import {replaceWorking, replaceRegion} from "../../redux/store";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/IconWorking'
import IconCopy from '../../svgs/basic/IconCopy'
import IconMinus from '../../svgs/basic/IconMinus'
import IconPlus from '../../svgs/basic/IconPlus'

import {CopyToClipboard} from 'react-copy-to-clipboard';

import flagNA from '../../images/flags/NA.png';
import flagEU from '../../images/flags/EU.png';
import flagKR from '../../images/flags/KR.png';
import flagCN from '../../images/flags/CN.png';


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

const DivRegion = styled(Div)`

  margin-top: 15px;
  margin-bottom: 5px;
  
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    width: auto;
  	margin-left: 5px;
  	margin-right: 5px;
  	border-radius: 6px;
  }
`

const ButtonRegion = styled(Button)`
  width: auto;
  height: auto;
  
  background-color: transparent;
  
  
`

const GroupNumber= styled(Div)`
  
  margin-top: 5px;
  margin-bottom: 5px;
  
	height: 36px;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    width: 150px;
  	margin-left: 5px;
  	margin-right: 5px;
  	border-radius: 6px;
  }
`


const ButtonNumberCenter = styled(Button)`
  width: 60px;
  height: 100%;
  
  
`
const ButtonNumberSide = styled(Button)`
  width: 30px;
  height: 100%;
  
`



 const Option = ({
  
  idPlanTeam
  , option
  , authority
  
  
  , addRemoveNotification
  , replaceRegion
   
 }) => {



  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  const onClick_ButtonRegion = async (event) => {
    
    switch(option.region) {
      case "NA":
        replaceRegion("EU");
        break;
      case "EU":
        replaceRegion("KR");
        break;
      case "KR":
        replaceRegion("CN");
        break;
      case "CN":
        replaceRegion("NA");
        break;
    }
  
  await axios.put (`${process.env.REACT_APP_URL_AHR}/plan-team/${idPlanTeam}`,
    {
      filter: {_id: idPlanTeam}
      , update : {
        $set: { "option.region": option.region }
      }
    }
  );
  
}
  
  
  // copy: https://www.npmjs.com/package/react-copy-to-clipboard
  
  
  return (
  <DivOption>
        
    <DivHeader>
      <DivTitle> Option </DivTitle>
      
    </DivHeader>

    
    
   <DivBody>
   
    <DivRegion>
      <Div> region:  </Div>
      <ButtonRegion onClick={onClick_ButtonRegion} > 
  	     <img src={objFlag[option.region]} width="48" height="36"/>
  	  </ButtonRegion>
  	</DivRegion>
   
   
    <GroupNumber>
      <Div> number of teams: </Div>
      
      <ButtonNumberSide> <IconMinus width={"20px"} height={"20px"} />  </ButtonNumberSide>
      <ButtonNumberCenter>
        {(option.numberTeams)? `${option.numberTeams}` : `auto`}
      </ButtonNumberCenter>
      <ButtonNumberSide> <IconPlus width={"20px"} height={"20px"} /> </ButtonNumberSide>
	  </GroupNumber>
	 
	 <GroupNumber>
      <Div> number of groups: </Div>
      
      <ButtonNumberSide> <IconMinus width={"20px"} height={"20px"} /> </ButtonNumberSide>
      <ButtonNumberCenter>
        {(option.numberTeams)? `${option.numberTeams}` : `none`}
      </ButtonNumberCenter>
      <ButtonNumberSide> <IconPlus width={"20px"} height={"20px"} /> </ButtonNumberSide>
	  </GroupNumber>
	   
	   
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
   
    //workingAddPlayer: state.working.addPlayer
    //,workingPutPlayerMmr: state.working.putPlayerMmr
    
    idPlanTeam: state.planTeam._id
    //,passwordPlanTeam: state.planTeam.password
    
    //, loadingPlanTeam: state.loading.planTeam
    //, readyPlanTeam: state.ready.planTeam
    
    ,option: state.planTeam.option
    , authority: state.authority
    
    //, planTeam: {...state.planTeam}
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceRegion: (regionName) => dispatch(replaceRegion(regionName))
    
    //,readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 

  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Option);