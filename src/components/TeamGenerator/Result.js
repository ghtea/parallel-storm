import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";

import {addResult} from "../../redux/store";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Button} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/IconLoading'

import IconConfirmed from '../../svgs/IconConfirmed'
import IconPending from '../../svgs/IconPending'
import IconInfo from '../../svgs/IconInfo'
import IconMagic from  '../../svgs/basic/IconMagic'

import {getRandomSubArray} from  '../../tools/vanilla/array'


const DivResult = styled(Div)`
  width: 100%;
  max-width: 600px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`;

const DivTitle = styled(Div)`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  
  margin-bottom: 10px;
`

const DivGenerate = styled(Div)`
  margin-top: 10px;
  margin-bottom: 10px;
`

const ButtonMagic = styled(Button)`
  width: 120px;
  height: 50px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  border-radius: 10px;
  
  & > div {
    
    height: 100%;
  }
`




const Result = ({
  option, listPlayerEntry
  , addRemoveNotification
}) => {
  
  const [listTeams, setListTeams] = useState([]);
  
  const region = option.region;
  const numberTeamsPlanned = option.numberTeams;
  const listPlayerBattletag = (Object.keys(listPlayerEntry)).map(element=>listPlayerEntry[element]._id); // list of battletags, this can be modified by .sort
  

  // 1. confirmed - 2. leader - 3. less roles player(2, 1) - 4. rest
  const onClick_generateTeams = (event) => {
    
    let numberTeamsResult;
    let listBattletagPlaying = [];
    let listBattletagPlayingSorted = [];
    
    //  후반에 쓰게될 정렬 함수
    const sortListBattletagByMmrHigherFirst = (battletag1, battletag2) => {    // mmr 높은순으로 list of battletags
      
      const objPlayer1 = listPlayerEntry.find(objPlayer => objPlayer._id === battletag1)
      const objPlayer2 = listPlayerEntry.find(objPlayer => objPlayer._id === battletag2)
      
      return (objPlayer2.mmr.standard[region] - objPlayer1.mmr.standard[region]);
      // ex 3333, 222, 1111
    }
    
    
    // A. 먼저 leader, confirmed  인 것들 고려해서 총 플레이 인원 뽑기
    // B. 그다음 총 리스트를 leader, 플레이 역할 적은 플레이어, 그외 로 세 개로 나누고, 각각의 3개의 리스트 안에서 mmr 높은 순으로 정렬하고 합치기
    // C. 정렬된 플레이러들을, (example of 3 teams)
    // team:  0 1 2    2 1 0   0 1 2    2 1 0  마지막 주기는  mmr 총합 낮은 팀에 mmr 높은 사람 넣는 식으로!
    
    // A-1
    const listBattletagConfirmed = listPlayerBattletag.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return ( objPlayer.status === "confirmed" )
      }
    )
    
    const listBattletagConfirmedLeader = listBattletagConfirmed.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return (objPlayer.tags.includes("leader"))
      }
    )
    
    const listBattletagConfirmedNonLeader = listBattletagConfirmed.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return ( !(objPlayer.tags.includes("leader")) )
      }
    )
    
    
    //  먼저 설정된 팀 개수 검토
    
    // numberTeamsPlanned: 0  means auto 
    if ( numberTeamsPlanned === 0 ) {
      numberTeamsResult = Math.floor(listBattletagConfirmed.length / 5);
    }
    else if (listBattletagConfirmed.length < (numberTeamsPlanned * 5)) {
      addRemoveNotification("error", "the number of team which you have set was adjusted");
      numberTeamsResult = Math.floor(listBattletagConfirmed.length / 5);
    }
    else {numberTeamsResult = numberTeamsPlanned}
    
    
    // A-2
    if (numberTeamsResult === 0) {
      addRemoveNotification("error", "need at least 5 confirmed players");
    }
    else if (listBattletagConfirmedLeader.length >= numberTeamsResult * 5 ) {
      listBattletagPlaying = getRandomSubArray(listBattletagConfirmedLeader, numberTeamsPlanned * 5 );
    }
    else {
      const numberConfirmedLeader = listBattletagConfirmedLeader.length;
      const listBattletagConfirmedNonLeaderPlaying = getRandomSubArray(listBattletagConfirmedNonLeader, (numberTeamsResult * 5 - numberConfirmedLeader) );
      listBattletagPlaying = [...listBattletagConfirmedLeader, ...listBattletagConfirmedNonLeaderPlaying];
    }
    
    
    
    //console.log("listBattletagPlaying")
    //console.log(listBattletagPlaying)
    
    // B. 그다음 총 리스트를 leader, 플레이 역할 적은 플레이어, 그외 로 세 개로 나누고, 각각의 3개의 리스트 안에서 mmr 높은 순으로 정렬하고 합치기
    let listBattletagPlayingLeader = listBattletagPlaying.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return ( objPlayer.tags.includes("leader") )
      }
    )
    listBattletagPlayingLeader = listBattletagPlayingLeader.sort( (battletag1, battletag2) => sortListBattletagByMmrHigherFirst(battletag1, battletag2) );
    
    
    let listBattletagPlayingLessRoles = listBattletagPlaying.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return ( !(objPlayer.tags.includes("leader")) && objPlayer.roles.length <= 2 )
      }
    )
    listBattletagPlayingLessRoles = listBattletagPlayingLessRoles.sort( (battletag1, battletag2) => sortListBattletagByMmrHigherFirst(battletag1, battletag2) );

   
   let listBattletagPlayingTheOthers = listBattletagPlaying.filter(
      battletag => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
        return (  !(objPlayer.roles.length <= 2) && !(objPlayer.tags.includes("leader"))   )
      }
    )
    listBattletagPlayingTheOthers = listBattletagPlayingTheOthers.sort( (battletag1, battletag2) => sortListBattletagByMmrHigherFirst(battletag1, battletag2) );
    
    
    // finally
    listBattletagPlayingSorted = [...listBattletagPlayingLeader, ...listBattletagPlayingLessRoles, ...listBattletagPlayingTheOthers];
    
   console.log(`listBattletagPlayingSorted`) 
    console.log(listBattletagPlayingSorted) 
    
    
    
   // C. 정렬된 플레이러들을, (example of 3 teams)
   // team:  0 1 2    2 1 0   0 1 2    2 1 0  마지막 주기는  mmr 총합 낮은 팀에 mmr 높은 사람 넣는 식으로!
   
   
   //https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
   
   
    let listIndexTeam = [];
   
    const listIncreasing = Array.from(Array(numberTeamsResult), (_, i) => i)  // => [0, 1, 2, 3, 4, 5, ...]
    const listDecreasing = Array.from(Array(numberTeamsResult), (_, i) => ( (numberTeamsResult - 1) - i) ) // => [5, 4, 3, ... ]

    
    listIndexTeam = [...listIncreasing, ...listDecreasing, ...listIncreasing, ...listDecreasing];
    
    
    let listTeamsTemp = new Array(numberTeamsResult);
    for ( let i  =0; i  < numberTeamsResult; i++) {
      listTeamsTemp[i] = [];
    }
    
    // why...!!!
    console.log(listTeamsTemp)
    
    for ( let iBattletag =0; iBattletag < listBattletagPlayingSorted.length; iBattletag++) {
      
      const cBattletag = listBattletagPlayingSorted[iBattletag];
      const indexTeamToPush = listIndexTeam[iBattletag];
      
      listTeamsTemp[ indexTeamToPush ].push( cBattletag );
    }
    
    
    let listTeamSumOfMmr = new Array(numberTeamsResult).fill(0);
    
    for ( let iTeam =0; iTeam < numberTeamsResult; iTeam++) {
      
      for ( let iMember =0; iMember < 4; iMember++) {
        
        const cBattletag = listTeamsTemp[iTeam][iMember];
        const cObjPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === cBattletag);
        
        listTeamSumOfMmr[iTeam] += cObjPlayer.mmr[region];
      }
      
    }
    
    let listIndexTeamWhichNeedHighMmrPlayer = [];
    const listTool = Array.from(Array(numberTeamsResult), (_, i) => i); // [0, 1, 2, ...]
    listIndexTeamWhichNeedHighMmrPlayer = listTool.sort( (index1, index2) => {
      
      const SumOfMmmr1 = listTeamSumOfMmr[index1];
      const SumOfMmmr2 = listTeamSumOfMmr[index2];
      
      return (SumOfMmmr1 - SumOfMmmr2);  // 작은게 앞에 나오게 된다.
    } )
    
    
    // 마지막 인원들 넣기
    for ( let jTeam =0; jTeam < numberTeamsResult; jTeam++) {
      
      const cIndexTeam = listIndexTeamWhichNeedHighMmrPlayer[jTeam];
      const cBattletag = listBattletagPlayingSorted[numberTeamsResult * 4 + jTeam];
      
      (listTeamsTemp[cIndexTeam]).push(cBattletag);
    }
    
    
    console.log(listTeamsTemp);

  }
  
  
  return (
  
  <DivResult>
    
    <DivTitle> Result </DivTitle>
    
    
    <DivGenerate>
    
      <ButtonMagic onClick={onClick_generateTeams}>
        <Div> Generate Teams </Div>
        <IconMagic width={"40px"} height={"40px"} />   
      </ButtonMagic>
    
    </DivGenerate>
  
    
    
  </DivResult>
    
  )
}




function mapStateToProps(state) { 
  return { 
    option: state.planTeam.option
    ,listPlayerEntry: state.planTeam.listPlayerEntry
    //listPlayerEntry: [...state.planTeam.listPlayerEntry]
    //,workingAddPlayerToListPlayerEntry: state.working.addPlayerToListPlayerEntry
    //,readyPlanTeam: state.ready.planTeam
    //,loading: state.loading
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addResult: (resultTeam) => dispatch( addResult(resultTeam) ) 
    ,  addRemoveNotification: (situation, message, time) => dispatch( addRemoveNotification(situation, message, time) )
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Result);