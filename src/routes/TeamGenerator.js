import React from 'react';
import styled from 'styled-components';

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import {Div, Input, Button} from '../styles/DefaultStyles';
import Player from '../components/Player'


const DivTeamGenerator = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`;


function TeamGenerator() {
  
  
  return (
    <DivTeamGenerator>
      <Div>
      
      <Input placeholder="battletag" />
      <Button> Add </Button>
      
      </Div>
      
      <Div>
        {[1,1,1,1].map( (element, i) =>
          
          <Player player={{}} />
        
        )}
      </Div>
    
  
    
    </DivTeamGenerator>
  );
}

export default TeamGenerator;