import React, { useRef, useState } from 'react';
import './Gotstyle.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

// import {AiFillStar}from 'react-icons/ai'


function CharacterLookup() {
  const [characterName, setCharacterName] = useState('');
  const [characterInfo, setCharacterInfo] = useState(null);
  const [houseName, setHouseName] = useState('');
  const [loading, setLoading] = useState(false);
  const characterNameInput = useRef(null)
  const [favorites, setFavorites] = useState([]);


  const handleSearch = () => {
    setLoading(true);
    setCharacterName(characterNameInput.current.value)
    // Fetch character info
    fetch(`https://anapioficeandfire.com/api/characters?name=${characterName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const firstCharacter = data[0];
          setCharacterInfo({
            name: firstCharacter.name,
            culture: firstCharacter.culture,
            titles: firstCharacter.titles.join(', '),
            aliases: firstCharacter.aliases.join(' , '),
            allegiances: firstCharacter.allegiances,
            playedby: firstCharacter.playedBy
          });

          // get house info if character has allegiances
          if (firstCharacter.allegiances) {
            fetch(firstCharacter.allegiances)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((houseData) => {
                setHouseName(houseData.name);
              })
              .catch((error) => {
                console.error('Error fetching house data:', error);
              });
          } else {
            setHouseName('No allegiance to a house');
          }
        } else {
          setCharacterInfo(null);
          setHouseName('Character not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching character data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const addToFavorites = (characterName) => {
    // Check if the character name is not already in the favorites
    if (!favorites.includes(characterName)) {
      setFavorites([...favorites, characterName]);
    }
  };
  console.log(characterName)
  
  
  return (
    
    <div className='background-img justify-center' >
       
      <h1>Game of Thrones Character Lookup</h1>
      {/* <Button>Account</Button> */}
    <input ref={characterNameInput}
        type="text"
        placeholder="Enter character's name"
        // value={characterName}
        // onChange={(e) => setCharacterName(e.target.value)}
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
       
      {characterInfo && (
        <div className="d-flex align-items-center justify-content-center">
        <Card style={{ width: '30rem'}}>
         {characterInfo.name.toLowerCase() === 'jon snow' && (
              <Card.Img variant="top" src="./jonsnow.jpeg" />
            )}
            {characterInfo.name.toLowerCase() === 'tyrion lannister' && (
              <Card.Img variant="top" src="./tyrionLannister.jpg" />
            )}
            
        <Card.Body >
        <Button onClick={()=> addToFavorites(characterInfo.name)} color='blue'>Add to Favorites</Button>
        
        <Card.Title>Character Info</Card.Title>
        <Card.Text>
         Name:<br/> {characterInfo.name}<br/>
         Culture: <br/>{characterInfo.culture}<br/>
         Titles:<br/> {characterInfo.titles}<br/>
         House:<br/> {houseName}<br/>
         Played By:<br/> {characterInfo.playedby}
        </Card.Text>
  
        </Card.Body>
        </Card>
        </div>
    
        // <div >
            
        //   <h2>Character Information</h2>
        //   {/* <image src={characterImg} ></image> */}
        //   <p>Name: {characterInfo.name}</p>
        //   <p>Culture: {characterInfo.culture}</p>
        //   <p>Titles: {characterInfo.titles}</p>
         
        //   <p>House: {houseName}</p>
        //   <p>Played By: {characterInfo.playedby}</p>
        
        // </div>
        
      )}
     
    </div>
  );
}

export default CharacterLookup;





