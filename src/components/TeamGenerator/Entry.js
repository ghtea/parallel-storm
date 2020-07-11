import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
//import path from 'path'
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Table, Tr, Td} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/IconLoading'
import IconInfo from '../../svgs/IconInfo'

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });

const DivEntry = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
`

const DivTableEntry = styled(Div)`
  
  padding-left: 20px;
  padding-right: 20px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/



const DivRow = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; // min entire = 400 - 20*2 = 360
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(1) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }
`




const DivBattletag = styled(Div)`
  padding-left: 5px;
  display: block;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`




const RowPlayer = ({battletag, mmr, statusPlayer}) => {
  return (
    
    <DivRow >
      
      <DivBattletag> 
        {battletag}
      </DivBattletag>
      
      <Div> 
        {mmr}
      </Div>
       
      <Div> 
        {statusPlayer}
      </Div>
        
      <Div> 
        A 
      </Div>
       
      <Div> 
        <IconInfo
          width={"20px"}
          height={"20px"}
        /> 
      </Div>
         
    </DivRow>
  )
}




const Entry = ({listPlayerEntry, workingAddPlayerToListPlayerEntry}) => {
  
  
  return (
  
  <DivEntry>
    
    <DivEntryTitle> Entry </DivEntryTitle>
    
    
    <DivTableEntry> 
    
    { !workingAddPlayerToListPlayerEntry &&
      ( listPlayerEntry ).map( (player, i) =>
      
        < RowPlayer 
          key={player._id} 
          battletag={player._id} 
          mmr={222} 
          statusPlayer={player.status} 
        /> 
      )
    }
      
    </DivTableEntry>
    
    
  </DivEntry>
    
  )
}

	  
//<button onClick= {refetch} > Refectch </button>



function mapStateToProps(state) { 
  return { 
    listPlayerEntry: state.planTeam.listPlayerEntry
    ,workingAddPlayerToListPlayerEntry: state.working.addPlayerToListPlayerEntry
    //,readyPlanTeam: state.ready.planTeam
    //,loading: state.loading
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Entry);