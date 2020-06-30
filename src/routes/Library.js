import React from 'react';
import styled from 'styled-components';

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import {Div} from '../styles/DefaultStyles';


const GET_AlBUMS = gql`
  {
    getAlbums {
      _id
      urlRym
      
      title
      artist
      year
      
      rating
      review
    }
  }
`;



const DivLibrary = styled(Div)`
  
  @media (max-width: 540px) {
    margin-top: 200px; 
  	
	}
 
	 @media (min-width: 541px) {
	  margin-top: 120px; 
		
	 }
  
`;

function Library() {
  
  const { loading, data } = useQuery(GET_AlBUMS);
   
  return (
    <DivLibrary>
    
    <Arrange />
    
    <DivAlbums> 
      {loading && <Div>Loading...</Div>}
      {!loading &&
        data.getAlbums &&
        data.getAlbums.map(album => 
        
        <Album 
          key={album._id} 
          album = {album}
        />
        
        )}
    </DivAlbums>
    
    </DivLibrary>
  );
}

export default Library;