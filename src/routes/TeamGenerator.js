import React from 'react';
import styled from 'styled-components';

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'

import TableEntry from '../components/TableEntry';

const DivTeamGenerator = styled(Div)`
  width: 100%;
  height:100%;
  
  @media (max-width:899px) {
  
  }
 

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 1fr;
    grid-template-areas: 
      "add option"
      "entry result";
  }


 
`;

const DivTitle = styled(Div)`
  font-size: 1.6rem;
  
`


const DivAdd = styled(Div)`
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
`;

const DivResult = styled(Div)`
  grid-area: result;
`;



function TeamGenerator() {
  
  
  return (
    <DivTeamGenerator>
      
      <DivAdd>
        <DivTitle>
          Team Generator
        </DivTitle>
        
        <Div>
          <Input placeholder="battletag" />
          <Button> Add </Button>
        </Div>
      
      </DivAdd>
      
      
      <DivOption>
        Option
      </DivOption>
    
      <DivEntry>
        <TableEntry />
      </DivEntry>
    
    
      <DivResult>
        Result
      </DivResult>
    
    </DivTeamGenerator>
  );
}

export default TeamGenerator;