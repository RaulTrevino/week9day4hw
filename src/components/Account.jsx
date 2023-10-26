import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>
      <button  className='border px-6 py-2 my-4 '>
        Logout
      </button>
      {favorites.length > 0 && (
        <div className='favorites-container'>
          {favorites.map((favorite, index) => (
            <div key={index} className='favorite-card'>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={favorite.image} />
                <Card.Body>
                  <Card.Title>{favorite.name}</Card.Title>
                  <Card.Text>
                    Culture: {favorite.culture}
                    Titles: {favorite.titles}
                    House: {favorite.house}
                    Played By: {favorite.playedby}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;




