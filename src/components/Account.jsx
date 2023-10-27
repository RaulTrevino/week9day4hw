import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  doc,
  where,
  deleteDoc,
  } from 'firebase/firestore'; 
  import './GOT1.css'
import { MdOutlineRemoveCircle } from 'react-icons/md';

const Account = () => {
  const { user, logout } = UserAuth();
  const [favorites, setFavorites] = useState([]); 
  const navigate = useNavigate();

 const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  // Delete character from Firebase///////////////////////////////////////////////////
  const deleteFavCharacter = async (id) => {
    await deleteDoc(doc(db, 'firstCharacter', id));
  };


  useEffect(() => {
    if (user && user.uid) {
       //here its querrying the db based on the user id
      const q = query(collection(db, 'firstCharacter'), where('userID', '==', user.uid));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //this below, is greating a list for the characters (objects) in the database
        let favoriteArr = [];
        querySnapshot.forEach((character) => {
           //this is adding each character to the list
          favoriteArr.push({ ...character.data(), id: character.id });
        });        
        //this is setting the state of the favorites list object to the list pereviously created 
        // useing the deconstructed useState
        setFavorites(favoriteArr);
      });
      return () => unsubscribe;
    } 
}, [user]);

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>
      <button onClick={handleLogout} className='border px-6 py-2 my-4 '>
        Logout
      </button>

      <h2 className='text-xl font-bold my-4'>Favorite Characters</h2>
      <div>
        {favorites.map((character, index) => (
          <Card key={index} className='my-2'>
            <Card.Body>
              <Card.Title>{character.name}</Card.Title>
              <Card.Text>
                Culture: {character.culture}
                <br />
                Titles: {character.titles}
                <br/>
                PlayedBy: {character.playedby}
              </Card.Text>
              <button className='mr-2' color='red' onClick={() => deleteFavCharacter(character.id)}>
                <MdOutlineRemoveCircle size={30} />
                </button>
            
            </Card.Body>
          </Card>
        ))}
       
      </div>
    </div>
  );
};

export default Account;
