import React from 'react';
import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';

import HeartFilled from '../svgs/heartFilled'
import Heart from '../svgs/heart'

const size = {
  widthAlbum: [100, 150]
}
const DivAlbum = styled(Div)`
  

  color: ${props => props.theme.color_strong};
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  
  margin: 5px;
  
  width: ${size.widthAlbum[1]}px;
 
  
`;


const DivTitle = styled(Div)`
  /* block 이어야 아래와 같은게 가능!*/
  display: block;
 
	width: 100%;
	height: 1.4em;
	
	text-algin: left;
	overflow: hidden;
	
	white-space: nowrap;
	text-overflow: ellipsis;
`

/*
width: inherit;
	
	height: 2.5em;
	line-height: 1.2em;
	overflow: hidden;
	
	white-space: nowrap;
	text-overflow: ellipsis;
*/

// text-align aligh img to center!!!

const DivAlbumCover= styled(Div)`
  position: relative;

	display: flex;
  flex-direction: column;
  justify-content: center;
  
	position: relative;
	width: ${size.widthAlbum[1]}px;
	height: ${size.widthAlbum[1]}px;
  
  text-align: center;
  
  &:hover > img {
    opacity:0.2;
  }
  &:hover > div {
    visibility: visible;
  }
}
`

const ImgAlbumCover = styled.img`
  position: absolute;
  z-index:1;

  width: 100%;
  heigth: 100%;
  
  border-radius: 4%;
  
`

const DivAlbumInfo = styled(Div)`
  position: absolute;
  z-index:2;
  
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  visibility: hidden;
`

const DivArtist = styled(Div)`

  width: 100%;
  height: 30%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DivArtistText = styled(Div)`
  width: 90%;
  
  display: block;
  text-algin: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`


const DivRating = styled(Div)`
  width: 100%;
  height: 20%;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivYear = styled(Div)`
  width: 100%;
  height: 30%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DivHeart = styled(Div)`
  margin-left: 2px;  
  margin-right: 2px;
`




function Album ({album}) {
	return (
 
  <DivAlbum>
  
    <DivTitle> {album.title} </DivTitle>
    
    <DivAlbumCover> 
    
      <ImgAlbumCover src= {`https://albumcover.avantwing.com/${album["_id"]}.png`} /> 
      
      
      <DivAlbumInfo className="DivAlbumInfo"> 
  	    
        <DivArtist> 
  	      <DivArtistText> by {album["artist"]}  </DivArtistText>
  	    </DivArtist>

  	    
      	<DivRating> 
      	  <DivHeart> <HeartFilled /> </DivHeart>
      	  <DivHeart> <HeartFilled /> </DivHeart>
      	  <DivHeart> <HeartFilled /> </DivHeart>
      	  <DivHeart> <Heart /> </DivHeart>
      	</DivRating>
      	
      	<DivYear> {album["year"]} </DivYear>
  	
    	</DivAlbumInfo>
  	
    </DivAlbumCover>
  	
  	
  	
  	
  
  	
	</DivAlbum>
	
	)
}

export default Album;

/*
<DivInfo> {album.artist} </DivInfo>
*/