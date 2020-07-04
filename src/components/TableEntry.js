import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div, Table, Tr, Td} from '../styles/DefaultStyles';

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";


/* 
https://github.com/nomadcoders/apollo-2020/tree/59e6b2c9d5eb9317282049e4420b8897f13ca8f2/src
https://github.com/nomadcoders/apollo-2020/blob/59e6b2c9d5eb9317282049e4420b8897f13ca8f2/src/routes/Detail.js
*/
const READ_PLAYER_MMR = gql`
  query ReadPlayerMmr ($_id: ID!) {
  
    readPlayerMmr (_id: $_id) {
    
    _id
    
    NA {
      QM {mmr games_played league_tier}
      UD {mmr games_played league_tier}
      SL {mmr games_played league_tier}
    }
    EU {
      QM {mmr games_played league_tier}
      UD {mmr games_played league_tier}
      SL {mmr games_played league_tier}
    }
    KR {
      QM {mmr games_played league_tier}
      UD {mmr games_played league_tier}
      SL {mmr games_played league_tier}
    }
    CN {
      QM {mmr games_played league_tier}
      UD {mmr games_played league_tier}
      SL {mmr games_played league_tier}
    }
  }
  
}
`;



const DivTableEntry = styled(Div)`
  margin-left: 40px;
  margin-right: 40px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`


/*
display:grid;
*/

const DivRow = styled(Div)`
  display: grid;
  grid-template-columns: minmax(200px, 250px) 80px 80px 40px 40px; // min entire = 400 - 40*2
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



const RowPlayer = ({_id, mmr}) => {
  return (
    
    <DivRow >
      
         <DivBattletag> {_id}</DivBattletag>
         <Div> {mmr}</Div>
         
         <Div> Tank, Bruiser</Div>
         <Div> A </Div>
         <Div> View </Div>
         
      </DivRow>
  )
}



const DivBattletag = styled(Div)`
  padding-left: 5px;
  display: block;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`




 const TableEntry = () => {
   
  
  const { loading, error, data } = useQuery(READ_PLAYER_MMR, {
    variables: { _id : "mbcat#1703" }
  });
  
  if (loading) {return <Div> Loading... </Div>}
  if (error) {return <Div> Error! </Div>}
  
  if (data && data.readPlayerMmr) {
    
    let listPlayerMmr = [ data.readPlayerMmr ]
     //listPlayerMmr.push(objPlayerMmr);
    
    return (
    
    <DivTableEntry>
    
      {listPlayerMmr.map( (element, i) => 
      
        (<RowPlayer _id={element["_id"]} mmr={element["mmr"]} key={ element["_id"] } />)
  
      )}
    
    </DivTableEntry>
    )
  }
}
  
	  

export default TableEntry;