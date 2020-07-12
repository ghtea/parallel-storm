import dotenv from 'dotenv';
import React, {useEffect} from 'react';
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


// STYLES
const DivAddingPlayer = styled(Div)`
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
  font-weight: bold;
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
  
  margin-top: 30px;
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

const InputBattletag = styled(Input)`
	width: 160px;
	height: 100%;
`

const InputName = styled(Input)`
	width: 120px;
	height: 100%;
`

const ButtonAdd = styled(Button)`
  width: 60px;
  height: 100%;
`

const DivIconWorking = styled(Div)`
  
`





 const AddingPlayer = ({
   
  workingAddPlayer 
  
  , loadingPlanTeam
  , readyPlanTeam
  
  , authority
  , planTeam
  
  , readPlanTeam
  , addRemoveNotification
  , replaceWorking
   
 }) => {

  const inputBattletag = useInput("");
  const inputName = useInput("");
  
  
  // heroes profile 에서 mmr 가져오기, cPlanTeam 에 플레이어 추가, cPlanTeam 의 플레이의 mmr 추가 모두
  const onClick_ButtonAdd = async (event, statusPlayer) => {
    
    let battletag = inputBattletag.value;
    let name = inputName.value;
    const idPlanTeam = planTeam._id;
    
    //console.log(battletag, name, idPlanTeam, statusPlayer)
    
    if (inputBattletag.value) {
      
      try {
        
        replaceWorking("addPlayer", true) // playermmr 옮기고, playerEntry 를 plan에 추가하고, 이후에 mmrStandar 도 추가하는 전체 작업 시작
        
        // /add/:battletag/:idPlanTeam/:status
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/add`,
          {
            battletag: battletag
            , idPlanTeam: idPlanTeam
            , name: name
            , status: statusPlayer
          }
        );
        
        replaceWorking("addPlayer", false)
        addRemoveNotification("success", "player has been added!");
        
        inputBattletag.setValue("");
        inputName.setValue("");
        
        readPlanTeam(idPlanTeam);  // important! need new data in redux for rernedering (ex: entry)

        
      } //try
      
      catch(error) {
        replaceWorking("addPlayer", false)
        addRemoveNotification("error", "check your battletag");
        // 1. battlelog 잘못입력
        // 2. 게임수가 극히 적은 battletag
        // 3. 내 백엔드 문제
        
      }
      
    } else { // 애초에 battletag를 입력 안했다면.
      addRemoveNotification("error", "type battletag first");
    }
    
   
  }
  
  /*
  // workingAddPlayer 가 O -> X 로 바뀌었을 때! <= 예상과 다르게 무한반복된다...
  useEffect(()=>{
    if(!workingAddPlayer){
      const idPlanTeam = planTeam._id;
      readPlanTeam(idPlanTeam);  // important! need new data in redux for rernedering (ex: entry)
    }
  }, [workingAddPlayer]
  )
  */
  
  /*
      if (status.mmr === true) {
        try {
          replaceWorking("addPlayerToListPlayerEntry", true)
          
          const requestBody = reqAddPlayerToListPlayerEntry(idPlanTeam, battletag, name, statusPlayer);
          //console.log(requestBody)
          await axios.put( `${process.env.REACT_APP_URL_AHR}/plan-team/${idPlanTeam}`, requestBody ); 
          
          replaceWorking("addPlayerToListPlayerEntry", false);
          addRemoveNotification("success", "player has been added!");
          status.add = true;
          
          
          readPlanTeam(idPlanTeam);
  
        }
        catch(error) {
          //addRemoveNotification("error", "api of Parallel Storm is not working", 5000);
          
          replaceWorking("addPlayerToListPlayerEntry", false)
          addRemoveNotification("error", "could not add player");
          
          status.add = false;
          
        }
      }
      
      
    
  */
  

  
  
  /*
  // using async in useEffect is special case (need self invoking)
  // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
  useEffect( () => { (async ()=>{
      console.log(playerMmr)
      console.log(workingPutPlayerMmr)
      console.log(workingAddPlayer)
      
      if (playerMmr && !workingPutPlayerMmr && workingAddPlayer) { // 한번 시도하면 안하고 끝내고 싶은데 두번씩 된다...
        try {
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", true)
          
          console.log("hi")
          const requestBody2 = reqPutPlayerMmrStandardToListPlayerEntry(battletag, playerMmr, idPlanTeam);
          
          console.log(requestBody2); 
          
          const res = await axios.put( `${process.env.REACT_APP_URL_AHR}/plan-team/${idPlanTeam}`, requestBody2 ); 
          
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", false);
          replaceWorking("workingAddPlayer", false);
          
          addRemoveNotification("success", "player's mmr has been added!");
          
          inputBattletag.setValue("");
          inputName.setValue("");
        }
        catch(error) {
          //addRemoveNotification("error", "api of Parallel Storm is not working", 5000);
          
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", false)
          replaceWorking("workingAddPlayer", false)
          
          addRemoveNotification("error", "could not add mmr to plan");
          
        }
        inputBattletag.setValue("");
        inputName.setValue("");
      }
      
      
  }) (); // self invoking
    }, [workingPutPlayerMmr, playerMmr]
  )
  */
  
  return (
  <DivAddingPlayer>
        
    <DivHeader>
      <DivTitle> {`${planTeam.title}`} </DivTitle>
      
      <DivId> {`id: ${planTeam._id}`} </DivId>
    </DivHeader>
    
    
    
   <DivBody>

	    <DivInputAdd>
	      <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
	      <InputName {...inputName} placeholder="name" />
	      
	      { (authority === "viewer") && workingAddPlayer && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />  
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "viewer") && !workingAddPlayer &&
          <ButtonAdd onClick = { async (event)=> onClick_ButtonAdd(event, "pending")} > Apply </ButtonAdd>
        }
        
        
        
        { (authority === "administrator") && workingAddPlayer && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />  
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "administrator") && !workingAddPlayer && 
          <>
            <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
          </>
        }

        
	    </DivInputAdd>
	    
	    <Div>
	      * name is not necessary
	    </Div>
	    
   </DivBody>
  
  </DivAddingPlayer>
        
  
  )

}
  
	  


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
export default connect(mapStateToProps, mapDispatchToProps)(AddingPlayer);