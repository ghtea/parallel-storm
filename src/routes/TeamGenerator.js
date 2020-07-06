import React from 'react';
import styled from 'styled-components';


import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'

import TableEntry from '../components/TableEntry';
import CreatingPlan from '../components/CreatingPlan';

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



const DivAddingPlayer = styled(Div)`
  grid-area: add;
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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


// DivAdd ~
const DivHeader = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivTitle = styled(Div)`
  font-size: 1.6rem;
`
const DivId = styled(Div)`
  color: ${props => props.theme.color_weak};
`


const DivBody = styled(Div)`

	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivInputAdd = styled(Div)`

	height: 2rem;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`

const InputBattletag = styled(Input)`
	width: 160px;
	height: 100%;
`

const ButtonAdd = styled(Button)`
  width: 60px;
  height: 100%;
`
// ~ DivAdd


// DivEntry ~

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
`

// ~ DivEntry


// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
function TeamGenerator({match, location}) {

  //console.log(`match: `)
  //console.log(match)
  
  //console.log(`location: `)
  //console.log(location)
  
  if (match.path === "/team-generator") { return (
    
      <DivTeamGenerator>
      
      
        <CreatingPlan />
        
      
      </DivTeamGenerator>
    
    )}
  
  else {
    const idPlanTeam = match.params.idPlanTeam;
    console.log(`idPlanTeam: ${idPlanTeam}`)
    return (
      <DivTeamGenerator>
        
        
        <DivAddingPlayer>
        
          <DivHeader>
            <DivTitle> Team Generator </DivTitle>
            
            <DivId> {`id: ${idPlanTeam}`} </DivId>
          </DivHeader>
          
          
          
         <DivBody>
	   
    		    <DivInputAdd>
    		      <InputBattletag placeholder="battletag#1234" />
    		      <ButtonAdd> Add </ButtonAdd>
    		    </DivInputAdd>
    		    
    	   </DivBody>
        
        </DivAddingPlayer>
        
        
        <DivOption>
          Option
        </DivOption>
      
        <DivEntry>
        
          <DivEntryTitle> Entry </DivEntryTitle>
        
          <TableEntry />
        </DivEntry>
      
      
        <DivResult>
          Result
        </DivResult>
      
      </DivTeamGenerator>
    );
  }
}

export default TeamGenerator;