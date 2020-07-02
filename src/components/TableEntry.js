import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div, Table, Tr, Td} from '../styles/DefaultStyles';


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
    border-radius: 10px 10px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 10px 10px;
    border-bottom-style: none;
  }
`

const RowsPlayer = () => {
  
  const listplayer = [
      {_id: "iceman#1111", mmr: 2000}
      ,{_id: "firemadfdffdn#1222", mmr: 1900}
    ]
  
  return listplayer.map((player, i) => {
    
    const { _id, mmr } = player //destructuring
     
    return (
      <DivRow key={_id}>
      
         <DivBattletag> {_id}</DivBattletag>
         <Div> {mmr}</Div>
         
         <Div> Tank, Bruiser</Div>
         <Div> A </Div>
         <Div> View </Div>
         
      </DivRow>
     )
  
  })
  
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
	return (
	<>
	
  <DivTableEntry>
  
   {RowsPlayer()}
                 
	</DivTableEntry>
	</>
	)
}

export default TableEntry;