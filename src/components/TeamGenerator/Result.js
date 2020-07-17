import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";

import {addResult} from "../../redux/store";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Table, Tr, Td} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/IconLoading'

import IconConfirmed from '../../svgs/IconConfirmed'
import IconPending from '../../svgs/IconPending'
import IconInfo from '../../svgs/IconInfo'
import IconMagic from  '../../svgs/basic/IconMagic'



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







const Result = ({option, listPlayerEntry}) => {
  
  const region = option.region;
  const numberTeamsPlanned = option.numberTeams;
  const listPlayerBattletag = (Object.keys(listPlayerEntry)).map(element=>listPlayerEntry[element]._id); // list of battletags
  

  // 1. confirmed - 2. leader - 3. less roles player(2, 1) - 4. rest
  const onClick_generateTeams = (event) => {
    
    //  후반에 쓰게될 정렬 함수
    const sortListBattletagByMmrHigherFirst = (battletag1, battletag2) => {    // mmr 높은순으로 list of battletags
      
      const objPlayer1 = listPlayerEntry.find(objPlayer => objPlayer._id === battletag1)
      const objPlayer2 = listPlayerEntry.find(objPlayer => objPlayer._id === battletag2)
      
      return (objPlayer2.mmr.standard[region] - objPlayer1.mmr.standard[region]);
      // ex 3333, 222, 1111
    }
    
    
    // 먼저 leader, confirmed  인 것들 고려해서 총 플레이 인원 뽑기
    // 그다음 총 리스트를 leader, 플레이 역할 적은 플레이어, 그외 로 세 개로 나누기
    // 각각의 3개의 리스트 안에서 mmr 높은 순으로 정렬
    // 정렬 지키면서, 세 리스트 합치기 
    // 정렬된 플레이러들을, [indexTeam, indextIn5] :  (example of 3 teams)
      //  [0,0] [1,0] [2,0]   [2,1] [1,1] [0,1]   [0,2] [1,2] [2,2]   [2,3] [1,3 [0,3]  마지막 주기는  mmr 총합 낮은 팀에 mmr 높은 사람 넣는 식으로!
    
    const listPlayerLeader = orderPlayer.filter(
      battletagPlayer => {
        const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletagPlayer)
        return (objPlayer.tags.includes("leader"))
      }
    )
    
    console.log(listPlayerLeader);
    //orderPlayer = 
    //console.log(orderPlayer)
    
    for (var i =0; i<numberTeams; i++) {
      const teamName = `team${i+1}`;
      objTeams[teamName] = `it is ${teamName}`
      listTeamName.push(teamName);
    }
    
    setResult(result+1);
    console.log(result)
    console.log(objTeams);
    
    /*
    {
      _id: String,
      listPlayerBattletag: [String],
      name: String,
      group: String
    }
    */
    
    let team1 = {
      _id: Date.now()
      ,listPlayerBattletag: ["mbcat#1234", "mbcat#1703"]
      ,name: "dragon team"
    }
    
    let resultTeam = {
      added: Date.now()
      ,listTeam: [
        team1
        
      ]
    }
    
    addResult(resultTeam);
  }
  
  
  
  return (
  
  <DivResult>
    
    <DivTitle> Result </DivTitle>
    
    <Div onClick={onClick_generateTeams}> 
      button
    </Div>
  
    {result && listTeamName.map(element=>
      <Div> {element} </Div>
    )}
    
    
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
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Result);