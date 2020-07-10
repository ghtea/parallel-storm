import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";

import {replaceWorking} from "../redux/store";
import {replaceLoading} from "../redux/store";
import {replaceReady} from "../redux/store";
import {replaceData} from "../redux/store";

import addRemoveNotification from "../redux/thunks/addRemoveNotification";

import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'



import CreatingPlan from '../components/TeamGenerator/CreatingPlan';
import SearchingPlan from '../components/TeamGenerator/SearchingPlan';

import AddingPlayer from '../components/TeamGenerator/AddingPlayer';
import Entry from '../components/TeamGenerator/Entry';

import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';


const DivTeamGenerator = styled(Div)`
  width: 100%;
  height: 100%;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 240px 240px 400px 400px;
    grid-template-areas: 
      "A"
      "B"
      "C"
      "D"
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 1fr;
    grid-template-areas: 
      "A B"
      "C D";
  }

`;


const DivA = styled(Div)`
  grid-area: A;
`
const DivB = styled(Div)`
  grid-area: B;
`
const DivC = styled(Div)`
  grid-area: C;
`
const DivD = styled(Div)`
  grid-area: D;
`



// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
const TeamGenerator = ({match, location, loading, ready, authority, replaceData, planTeam, readPlanTeam, addRemoveNotification, replaceReady, replaceLoading}) => {
  
  const onAccess = async () => {
    
    if (match.path === "/team-generator/:idPlanTeam") {
      
      const idPlanTeamTrying = match.params.idPlanTeam;

      
      try {
        // below includes replaceLoading, etc...
        readPlanTeam(idPlanTeamTrying);
      }
      catch (error) {
        addRemoveNotification("error", "failed to load plan", 4000);
      }
      
    }
  }  
  
  useEffect( () => {onAccess()}, []);
  
  
  // ready.planTeam 이 변동되었을 때, ready.planTeam === true 인지 확인하고, 맞으면 비밀번호 확인
  const onPlanTeam = async () => {
    
    if (ready.planTeam === true) {
      const idPlanTeamTrying = match.params.idPlanTeam;
      const query = queryString.parse(location.search);
      const passwordPlanTeamTrying = query.pw;
  
      replaceData("idPlanTeam", idPlanTeamTrying);
    
      
      // if password is right
      if (passwordPlanTeamTrying === planTeam.password) {
        replaceData("authority", "administrator");
        addRemoveNotification("success", "welcome administrator!", 2000);
      }
      
      // if password is wrong
      else {
        replaceData("authority", "viewer");
        addRemoveNotification("error", "password is wrong", 4000);
      }
    }
    
  }  
  
  useEffect( () => {onPlanTeam()}, [ready.planTeam]);
  
  
  //console.log(`idPlanTeam: ${idPlanTeam}`)
  if (match.path === "/team-generator") {
    
    return (
    
    <DivTeamGenerator>
      
      <DivA>
        <CreatingPlan /> 
      </DivA>
      
      <DivB>
        <SearchingPlan />
      </DivB>
    
    </DivTeamGenerator>
    )
  } // if
    
    
  else if (match.path === "/team-generator/:idPlanTeam") { 
   return (
   <DivTeamGenerator>
      
      <DivA>
        <AddingPlayer />
      </DivA>
      
      <DivB>
        {authority === "administrator" ? "welcome administrator" : "hi viewer" }
      </DivB>
    
    
      <DivC>
        entry
      </DivC>
    
    
      <DivD>
        result
      </DivD>
    
    </DivTeamGenerator>
    )
  } // else
 
    
} //TeamGenerator



function mapStateToProps(state) { 
  return { 
    planTeam: state.planTeam
    ,ready: state.ready 
    ,loading: state.loading
    ,authority: state.authority
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    ,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    ,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    ,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    ,addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGenerator);
