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


// REQUSTS
const reqPutPlayerMmr = (battletag) => {  
  return {
    filter: {_id: battletag }
  }
};

// "listPlayerEntry._id": { $ne: battletag }  }   //very important  // https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose




// only add battletag, not mmr (add mmr data later)
const reqAddPlayerToListPlayerEntry = (idPlanTeam, battletag, name, status) => {  
  return ({
    
    filter: {
      _id: idPlanTeam,
    	"listPlayerEntry._id": { $ne: battletag }  // it's important! => 나중에 기존에 이미 저장되있던 유저 정보를 통째로 replace 하지 않도록!
    }
    
    ,update: {
      $addToSet: { 
        listPlayerEntry: 
        
        { 
          _id: battletag
          , name: name
          , status: status
          
        }
        
    	}
  	}
  	
  })
};
// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
// https://stackoverflow.com/questions/15921700/mongoose-unique-values-in-nested-array-of-objects




// 브라우저로 playerMmr데이터를 가져온 순간에 그걸 이용해서 데이터베이스 상의 planTeam 속 플레이어의 mmr Standard 추가/수정
const reqPutPlayerMmrStandardToListPlayerEntry = (battletag, playerMmr, idPlanTeam) => {
  
  console.log("reqPut..standard...")
  const listRegion = ["NA", "EU", "KR", "CN"];
  
  let newMmr = {
    standard: {}
    ,manual: {}
  };
  
  newMmr["standard"]["NA"] = playerMmr["NA"]["STANDARD"];
  
  /*
  listRegion.map((element, i) => {
    newMmr["standard"][element]  = playerMmr[element]["STANDARD"];
  });
  */
  
  console.log(newMmr);
  
  return (
    {
    
      filter: {
        _id: idPlanTeam
        , "listPlayerEntry._id": battletag
      }		
      
      ,update: {
        $set: { "listPlayerEntry.$.mmr" : newMmr }
    	}
  	
    }
  )
};



const FormAdd = () => {
  
}


 const AddingPlayer = ({
   
  workingAddPlayer
  , workingPutPlayerMmr  
  
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
  
  let idPlanTeam = planTeam._id;
  let battletag = inputBattletag.value;
  let name = inputName.value;
  let playerMmr;
  
  const onClick_ButtonAdd = async (event, statusPlayer) => {
    
    
    if (inputBattletag.value) {
       
      
      let status = {};
      
      try {
        replaceWorking("addPlayer", true) // playermmr 옮기고, playerEntry 를 plan에 추가하고, 이후에 mmrStandar 도 추가하는 전체 작업 시작
        
        replaceWorking("putPlayerMmr", true)
        const data = await axios.put (`${process.env.REACT_APP_URL_AHR}/player-mmr`, reqPutPlayerMmr(battletag));
        playerMmr = {...data};
        console.log(playerMmr)
        replaceWorking("putPlayerMmr", false)
        addRemoveNotification("success", "player's mmr has been found!");
        status.mmr = true; // mmr 작업이 잘되었다고 표시, rerendering 최소화하려고 이렇게 일시적인 변수 이용
        
      }
      catch(error) {
        replaceWorking("putPlayerMmr", false)
        addRemoveNotification("error", "could not found player");

        status.mmr = false; // mmr 작업이 정상적으로 끝나지 않았다고 표시 (실제로 에러가 발생하지 않는다)
      }
      
      
      
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
      
      
    } else { // 애초에 battletag를 입력 안했다면.
      addRemoveNotification("error", "type battletag first");
    }
  }
  
  
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
	      
	      { (authority === "viewer") && workingPutPlayerMmr && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />  
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "viewer") && !workingPutPlayerMmr &&
          <ButtonAdd onClick = { async (event)=> onClick_ButtonAdd(event, "pending")} > Apply </ButtonAdd>
        }
        
        
        
        { (authority === "administrator") && workingPutPlayerMmr && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />  
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "administrator") && !workingPutPlayerMmr && 
          <>
            <ButtonAdd onClick = { async (event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
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
    ,workingPutPlayerMmr: state.working.putPlayerMmr
    
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