import dotenv from 'dotenv';
import React from 'react';
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
  
  const listRegion = ["NA", "EU", "KR", "CN"];
  let newMmrStandard = {};
  
  listRegion.map((element, i) => {
    newMmrStandard[element] = playerMmr[element]["STANDARD"];
  });
  
  return ({
    
    filter: {
      _id: idPlanTeam
      , "listPlayerEntry._id": battletag
    }		
    
    ,update: {
      $set: { "listPlayerEntry.$.mmr" : newMmrStandard }
  	}
  	
  })
};



const FormAdd = () => {
  
}


 const AddingPlayer = ({
   
   workingPutPlayerMmr  
   
    , loadingPlanTeam
    , readyPlanTeam
   
    , authority
    , planTeam
   
    , addRemoveNotification
    , replaceWorking
   
 }) => {

  const inputBattletag = useInput("");
  const inputName = useInput("");
  
  const onClick_ButtonAdd = async (event, statusPlayer) => {
    
    let playerMmr;
    
    if (inputBattletag.value) {
       
      const idPlanTeam = planTeam._id;
      const battletag = inputBattletag.value;
      const name = inputName.value;
      
      let status = {};
      
      try {
        
        replaceWorking("putPlayerMmr", true)
        playerMmr = await axios.put (`${process.env.REACT_APP_URL_AHR}/player-mmr`, reqPutPlayerMmr(battletag));
        console.log(playerMmr);
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
        }
        catch(error) {
          //addRemoveNotification("error", "api of Parallel Storm is not working", 5000);
          
          replaceWorking("addPlayerToListPlayerEntry", false)
          addRemoveNotification("error", "could not add player");
          
          status.add = false;
          
        }
      }
      
      inputBattletag.setValue("");
      inputName.setValue("");
      
      // 뒤에서 몰래 mmrStandard 작업
      if (status.add === true) {
        try {
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", true)
          
          const requestBody = reqPutPlayerMmrStandardToListPlayerEntry(battletag, playerMmr, idPlanTeam);
          
          console.log(requestBody); 
          
          await axios.put( `${process.env.REACT_APP_URL_AHR}/plan-team/${idPlanTeam}`, requestBody ); 
          
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", false);
          //addRemoveNotification("success", "player has been added!");
        }
        catch(error) {
          //addRemoveNotification("error", "api of Parallel Storm is not working", 5000);
          
          replaceWorking("addPlayerMmrStandardToListPlayerEntry", false)
          //addRemoveNotification("error", "could not add player");
          
        }
      }
      
      // input value 초기화
      
    } else { // 애초에 battletag를 입력 안했다면.
      addRemoveNotification("error", "type battletag first");
    }
  }
  
  
  
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
          <ButtonAdd onClick = {()=> onClick_ButtonAdd("pending")} > Apply </ButtonAdd>
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
            <ButtonAdd onClick = {(event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
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
   
    workingPutPlayerMmr: state.working.putPlayerMmr
    
    //,idPlanTeam: state.idPlanTeam
    //,passwordPlanTeam: state.planTeam.password
    
    , loadingPlanTeam: state.loading.planTeam
    , readyPlanTeam: state.ready.planTeam
    
    , authority: state.authority
    , planTeam: state.planTeam
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(AddingPlayer);