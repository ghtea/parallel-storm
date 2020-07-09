import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";
import {addNotification} from "../redux/store";
import {removeNotification} from "../redux/store";
import addRemoveNotification from "../redux/thunks/addRemoveNotification";

import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'

import CreatingPlan from '../components/CreatingPlan';

import AddingPlayer from '../components/AddingPlayer';
import TableEntry from '../components/TableEntry';

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




// DivEntry ~

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
`

// ~ DivEntry




  
  
  

// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
const TeamGenerator = ({match, location, loading, ready, planTeam, readPlanTeam, addRemoveNotification}) => {
  
  const idPlanTeam = match.params.idPlanTeam;
  

  //console.log(`idPlanTeam: ${idPlanTeam}`)
  if (match.path === "/team-generator") {
    
    return (
    
    <DivTeamGenerator>
    
      <CreatingPlan /> 
    
    </DivTeamGenerator>
    )
  } // if
    
    
  else { 
   return (
   <DivTeamGenerator>
        
      <AddingPlayer idPlanTeam={idPlanTeam}/>
    
      <DivOption>
        Option
      </DivOption>
    
      <DivEntry>
      
        <DivEntryTitle> Entry </DivEntryTitle>
      
        <TableEntry />
      </DivEntry>
    
    
      <DivResult>
      
      </DivResult>
    
    </DivTeamGenerator>
    )
  } // else
 
    
} //TeamGenerator



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
    ,addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
    ,addNotification: (situation, message, idNotification) => dispatch( addNotification(situation, message, idNotification) )
    ,removeNotification: (idNotification) => dispatch(removeNotification(idNotification))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGenerator);
