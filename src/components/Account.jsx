import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  query,
  collection,
  onSnapshot,
  addDoc,
//   doc,
//   where,
//   deleteDoc,
} from 'firebase/firestore';

const Account = () => {
  const { user, logout } = UserAuth();
  const [name, setname] = useState([]);
  const [createFormData, setCreateFormData] = useState({
    age: '',
    college: '',
    name: '',
    number: '',
    position: '',
    team:'',
  });

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
  // Read subscription from Firebase
  useEffect(() => {
    const q = query(collection(db, 'name'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let nameArr = [];
      querySnapshot.forEach((sub) => {
        nameArr.push({ ...sub.data(), id: sub.id });
      });
      setname(nameArr);
    });
    return () => unsubscribe;
  }, []);

  // Create subscription in Firebase

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createSubscription = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'name'), {
        userID: user.uid,
        age: createFormData.age,
        college: createFormData.college,
        name: createFormData.name,
        number: parseFloat (createFormData.number),
        position: createFormData.position,
        team: createFormData.team,
      });
      setCreateFormData({
        age: '',
        college: '',
        name: '',
        number: '',
        position: '',
        team:'',
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  // Update subscription from Firebase
  // Delete subscription from Firebase

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email:{user && user.email}</p>
      <button onClick={handleLogout} className='border px-6 py-2 my-4 '>
        Logout
      </button>
      <form
        onSubmit={createSubscription}
        className='m-4 flex-col justify-between'
      >
        <input
          value={createFormData.name}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter Players Name'
          name='name'
        />
        <input
          value={createFormData.age}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='number'
          placeholder='Enter players age'
          name='age'
        />
        <input
          value={createFormData.college}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Enter players college'
          name='college'
        />
        <input
          value={createFormData.number}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='number'
          placeholder='Enter jersey number'
          name='jersey #'
        />
        <input
          value={createFormData.position}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Players Position'
          name='position'
        />
           <input
          value={createFormData.team}
          onChange={handleInputChange}
          className='border p-2 w-full text-xl'
          type='text'
          placeholder='Players Team'
          name='Team'
        />
        <button
          className='border p-4 ml-2 mt-2 bg-purple-500 text-slate-100'
          type='submit'
        >
          Add Players Info
        </button>
      </form>
      {name.map((name) => {
        const playername = name;

        return (
          <li key={name.id}className='flex justify-between bg-green-500 p-4 my-2 capitalize' rounded-3xl
>
            <div className='flex '>
              <p className='ml-2 cursor-pointer'>
                Player: {name.team}
              </p>
              <p className='ml-2 cursor-pointer'>playername: {name.name}</p>
            </div>
              {/* <p className='ml-2 cursor-pointer '> Renew Date: {dateString}</p> */}
          </li>
        );
      })}
    </div>
  );
};

export default Account;