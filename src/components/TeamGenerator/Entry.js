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

import IconConfirmed from '../../svgs/IconConfirmed'
import IconPending from '../../svgs/IconPending'
import IconInfo from '../../svgs/IconInfo'
import IconStar from '../../svgs/IconStar'

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMeleeAssassin from '../../svgs/roles/IconMeleeAssassin'
import IconRangedAssassin from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });

const DivEntry = styled(Div)`
  width: auto;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`;

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;
  
  margin-top: 10px;
  height: 20px;
  margin-bottom: 5px;
`

const DivDescription = styled(Div)`
  font-weight: medium;
  margin-top: 5px;
  height: 15px;
  margin-bottom: 15px;
`



const DivTableEntry = styled(Div)`
  
  margin-left: 10px;
  margin-right: 10px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    overflow-y: scroll;
    height: 320px;
  }
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/

const DivRowHeader = styled(Div)`
  color: ${props => props.theme.color_weak};

  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410 => 안전하게 small_mid 420 으로 하자
  grid-template-rows: 24px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 90px minmax(72px, auto) 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  & > Div {
    font-weight: thin;
  }
  //background-color: ${props => props.theme.COLOR_normal};
   
  //border-radius:  8px;
`


const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410
  grid-template-rows: 40px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 100px 80px 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  &:last-child {
    border-bottom-style: none;
  }
`

/*
const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; 
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(2) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }

*/

const DivStar = styled(Div)`
  
    
`

const DivBattletagHeader = styled(Div)`
  padding-left: 10px;
  
  display: block;
  text-algin: left;
`

const DivBattletag = styled(Div)`
  justify-self: start;
  
  padding-left: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

const DivBattletagName = styled(Div)`
  
  width: inherit;
  
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DivBattletagNumber = styled(Div)`
  font-size: 0.9rem;
  
  width: auto;
   
  color: ${props => props.theme.color_weak};
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`


const DivRoles = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  & > div {
    width: auto;   // important!!!
    height: auto;
  }
  
  & > div > div {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
`
const DivMmr = styled(Div)`
  font-size: 0.9rem;
`


const RowPlayer = ({battletag, mmr, regions, roles, statusPlayer}) => {
  
  useEffect(()=>{console.log("Each row has been rerendered")})
  
  const IconStatus = {
    pending: <IconPending width={"20px"} height={"20px"} />
    ,confirmed: <IconConfirmed width={"20px"} height={"20px"} />
  };
  
  const regexBattletag = /(#\d*)$/;
  const listNumberBattletag = battletag.match(regexBattletag);
  
  const battletagNumber = listNumberBattletag[0];
  const battletagName = battletag.replace(regexBattletag, "")
  
  

  return (
    
    <DivRowPlayer >
      
      <DivStar > 
        <IconStar
          width={"20px"}
          height={"20px"}
          isFilled={false}
        />  
      </DivStar >
      
      <DivBattletag> 
        <DivBattletagName> {battletagName} </DivBattletagName>
        <DivBattletagNumber> {battletagNumber} </DivBattletagNumber>
      </DivBattletag>
      
      <DivRoles> 
        <Div> {(roles.includes("Tank"))? <IconTank width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Bruiser"))? <IconBruiser width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Melee Assassin"))? <IconMeleeAssassin width={"18px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Ranged Assassin"))? <IconRangedAssassin width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Healer"))? <IconHealer width={"15px"} height={"20px"} /> : <Div></Div>} </Div>
      </DivRoles>
      
      
      <DivMmr> 
        {mmr}
      </DivMmr>
       
      <Div> 
        {IconStatus[statusPlayer]}
      </Div>
        
       
         
    </DivRowPlayer>
  )
}




const Entry = ({listPlayerEntry}) => {
  
  useEffect(()=>{console.log("Entry has been rerendered")})
  
  
  return (
  
  <DivEntry>
    
    <DivEntryTitle> Entry </DivEntryTitle>
    <DivDescription> {`${listPlayerEntry.length} players`} </DivDescription>
    
    
    <DivTableEntry> 
    
    <DivRowHeader> 
      <Div>  </Div>
      <DivBattletagHeader>  battletag </DivBattletagHeader>
      <Div> roles </Div>
      <Div> mmr </Div>
      <Div>  </Div>
      
    </DivRowHeader>
    
    { 
      ( listPlayerEntry ).map( (player, i) =>
      
        < RowPlayer 
        
          key={ `${player._id}_${(new Date().getTime()).toString()}` }
          
          battletag={player._id} 
          
          regions ={player.regions}
          
          mmr={player.mmr.standard.NA} 
          
          roles ={player.roles}
          
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
    listPlayerEntry: [...state.planTeam.listPlayerEntry]
    //,workingAddPlayerToListPlayerEntry: state.working.addPlayerToListPlayerEntry
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