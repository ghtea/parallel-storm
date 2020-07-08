import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { connect } from "react-redux";
import { actionCreators } from "../store";
import {readPlanTeam} from "../store";

import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'

import TableEntry from '../components/TableEntry';
import CreatingPlan from '../components/CreatingPlan';
import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';


const DivTeamGenerator = styled(Div)`
  width: 100%;
  height:100%;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 240px 240px 400px 400px;
    grid-template-areas: 
      "add"
      "option"
      "entry"
      "result"
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 1fr;
    grid-template-areas: 
      "add option"
      "entry result";
  }


 
`;



const DivAddingPlayer = styled(Div)`
  grid-area: add;
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DivOption = styled(Div)`
  grid-area: option;
`;

const DivEntry = styled(Div)`
  grid-area: entry;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DivResult = styled(Div)`
  grid-area: result;
`;


// DivAdd ~
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

const ButtonAdd = styled(Button)`
  width: 60px;
  height: 100%;
`
// ~ DivAdd


// DivEntry ~

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
`

// ~ DivEntry

const reqPutPlayerMmr = (battletag) => {  
  return {
    filter: {_id: battletag }
  }
};

// "listPlayerEntry._id": { $ne: battletag }  }   //very important  // https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose



// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
const reqAddPlayerToListPlayerEntry = (idPlanTeam, battletag) => {  
  return ({
    
    filter: {
      _id: idPlanTeam,
    	"listPlayerEntry._id": { $ne: battletag }  // it's important!
    }		
    
    ,update: {
      $addToSet: { 
        listPlayerEntry: { _id: battletag }
    	}
  	}
  	
  })
};


  
  
  

// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
const TeamGenerator = ({match, location, loading, ready, planTeam, readPlanTeam}) => {
  
  const idPlanTeam = match.params.idPlanTeam;
  
  const inputBattletag = useInput("");
  
  
  
  const onClick_ButtonAdd = async (event) => {
    
    if (inputBattletag.value) {
      try {  
        
        const battletag = inputBattletag.value;
        
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/PlayerMmr`, reqPutPlayerMmr(battletag));
        // 위에서 에러가 나서 아래로 진행 안시키게 해보자
        
        
        await axios.put( `${process.env.REACT_APP_URL_AHR}/PlanTeam`, reqAddPlayerToListPlayerEntry(idPlanTeam, battletag) ); 
        
        
        console.log("ahr worked well")
        
      }
      catch(e) {console.log(e)}
      
      
    } else {
      console.log("type battletag first")
    }
  }


  //console.log(`match: `)
  //console.log(match)
  
  //console.log(`location: `)
  //console.log(location)
  
  if (match.path === "/team-generator") { return (
    
      <DivTeamGenerator>
      
      
        <CreatingPlan />
        
      
      </DivTeamGenerator>
    
    )}
  
  else {
    
    //console.log(`idPlanTeam: ${idPlanTeam}`)
    return (
      <DivTeamGenerator>
        
        
        <DivAddingPlayer>
        
          <DivHeader>
            <DivTitle> Team Generator </DivTitle>
            
            <DivId> {`id: ${idPlanTeam}`} </DivId>
          </DivHeader>
          
          
          
         <DivBody>
	   
    		    <DivInputAdd>
    		      <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
		          <ButtonAdd onClick = {onClick_ButtonAdd} > Add </ButtonAdd>
    		    </DivInputAdd>
    		    
    	   </DivBody>
        
        </DivAddingPlayer>
        
        
        <DivOption>
          Option
        </DivOption>
      
        <DivEntry>
        
          <DivEntryTitle> Entry </DivEntryTitle>
        
          <TableEntry />
        </DivEntry>
      
      
        <DivResult>
          Result
        </DivResult>
      
      </DivTeamGenerator>
    );
  }
}



function mapStateToProps(state) { 
  return { 
    planTeam: state.planTeam
    ,ready: state.ready 
    ,loading: state.loading
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}

// Home 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGenerator);
