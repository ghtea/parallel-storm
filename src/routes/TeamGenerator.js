import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";

import {replaceRerender} from "../redux/store";
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
const TeamGenerator = ({
  match, location
  
  , loadingPlanTeam
  , readyPlanTeam
  , idPlanTeam, passwordPlanTeam
  
  , rerenderPlanTeam
  
  , readPlanTeam
  , addRemoveNotification
}) => {
  
  //const [rerender, SetRerender] = useState("");
  const idPlanTeamTrying = match.params.idPlanTeam;
  
  const isFirstRun = useRef(true);
  
  useEffect(()=>{
    readPlanTeam(idPlanTeamTrying);
  }, []);
  
  
  
  useEffect(()=>{
    /*
    if (idPlanTeamTrying && readyPlanTeam === false)  {  // (readyPlanTeam === false)
      replaceData("authority", "viewer");
      addRemoveNotification("error", "plan id is wrong", 3000);
    }
    */
    const query = queryString.parse(location.search);
    const passwordPlanTeamTrying = query.pw;
    
    if (isFirstRun.current) {isFirstRun.current = false; return; } // 처음 렌더링 넘어가기 (아직 스토어 업데이트 반영 잘 못해서..)
    // 참고1 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
    // 참고2 https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    
    
    if (readyPlanTeam === true) {
      
      if (passwordPlanTeamTrying === passwordPlanTeam) {
          replaceData("authority", "administrator");
          addRemoveNotification("success", "welcome administrator!", 3000);
          
        }
        
      // if password is wrong
      else if (passwordPlanTeamTrying) {
        replaceData("authority", "viewer");
        addRemoveNotification("error", "password is wrong", 3000);
      }
      else {
        replaceData("authority", "viewer");
        addRemoveNotification("success", "welcome viewer!", 3000);
      }
    }
    
  }, [readyPlanTeam] )
    
    
    
  useEffect(()=>{
    console.log("rerendered")
  } )
  
  
  if (readyPlanTeam === false) {
    return (
      <DivTeamGenerator>
        
        <DivA>
          incorrect id of plan
        </DivA>
        
      </DivTeamGenerator>
    )
  } 
  
  else {
   return (
   <DivTeamGenerator>
      
      <DivA>
        <AddingPlayer />
      </DivA>
      
      <DivB>
        option 
      </DivB>
    
    
      <DivC>
        entry
      </DivC>
    
    
      <DivD>
        result
      </DivD>
    
    </DivTeamGenerator>
    )
  }

 
    
} //TeamGenerator



function mapStateToProps(state) { 
  return { 
    
    idPlanTeam: state.idPlanTeam
    ,passwordPlanTeam: state.planTeam.password
    
    , loadingPlanTeam: state.loading.planTeam
    , readyPlanTeam: state.ready.planTeam
    
    //, rerenderPlanTeam: state.rerender.planTeam
    
    //,loading: state.loading
    //,authority: state.authority
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    //,replaceRerender: (which) => dispatch(replaceRerender(which))
    ,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    ,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    ,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    ,addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGenerator);
