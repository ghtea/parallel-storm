import React, {useEffect} from 'react';
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

import {Div, Input, Button, A} from '../styles/DefaultStyles';
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
  
  flex-direction: column;
`
const DivC = styled(Div)`
  grid-area: C;
`
const DivD = styled(Div)`
  grid-area: D;
`



// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
const TeamGeneratorDoor = ({}) => {
  

    
    return (
    
    <DivTeamGenerator>
      
      <DivA>
        <CreatingPlan /> 
      </DivA>
      
      <DivB>
        <Div> if you have forgot url, contact me </Div>
        <Div> <A href="https://twitter.com/mbcat_hots" > @mbcat_hots </A>  </Div>
      </DivB>
      
      <DivC>
        
      </DivC>
    
    </DivTeamGenerator>
    )
  

    
} //TeamGenerator



function mapStateToProps(state) { 
  return { 
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGeneratorDoor);
