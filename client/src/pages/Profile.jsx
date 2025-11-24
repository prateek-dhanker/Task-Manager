import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Profile = (props) => {
  let token = props.token;
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/auth/all`)
      .then(res => {
          const allUsers = res.data;
          setUserList(allUsers);
      })
      .catch(err => console.error(err));

  });

  const handleDelete = async(username) =>{
    try {
      if(confirm("wanna delete")){
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/delete`, {username });
        if(username == token.username){
          localStorage.removeItem('token');
          navigate('/')
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Delete failed';
      alert(errorMsg);
    }
  };

  const handleEdit = async(username) =>{
    try {
      const newUsername = prompt("Type new username");
      if(newUsername.length){
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/edit`, {username : username, newUsername:newUsername, admin:token.admin});

        if(username == token.username){

          localStorage.removeItem('token');
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard')
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Edit failed';
      alert(errorMsg);
    }
  };
  return (
    <div className='flex-col space-y-4'>
      <div className="col-span-3 bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">User Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm">Username</label>
            <p className="text-white font-semibold">{token.username}</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm">Email</label>
            <p className="text-white font-semibold">email.com</p>
          </div>

          <div>
            <label className="block text-gray-400 text-sm">Role</label>
            {token.admin ? <p className="text-white font-semibold">Admin</p> : <p className="text-white font-semibold">Regular</p>}
          </div>

        </div>

        <div className="mt-8">
          <button className="px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition" onClick={()=>handleEdit(token.username)}>
            Edit Profile
          </button>
          <button className="mx-5 px-4 cursor-pointer py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition" onClick={()=> handleDelete(token.username)}>
            Delete Profile
          </button>
        </div>
      </div>
      {token.admin && <h2 className="text-2xl font-bold mb-6">All Users</h2>}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-90 gap-y-0 w-full'>
        {token.admin && userList.map(user => (
          <div className=" flex-col m-4 bg-gray-800 p-6 rounded-xl shadow-lg min-w-[250px]">
              <h3 className="text-xl font-bold">{user.username}</h3>
              <p className="text-sm text-gray-300 mb-2">email.com</p>
              {user.admin ? <p className='text-l font-bold'>Admin</p> : <p className='text-l font-bold'>Regular</p>}
              <div className="mt-4 flex gap-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-sm rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(user.username)}
                  >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-sm rounded hover:bg-red-700"
                  onClick={() => handleDelete(user.username)}
                  >
                  Delete
                </button>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
