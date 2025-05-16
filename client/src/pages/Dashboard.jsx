import React from 'react';
// import * as jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import Overview from './Overview';
import Tasks from './Tasks';
import Profile from './Profile';


function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {    
      if(token == undefined)
            navigate('/login')
    }, [])
    

    let decoded;

    if (token) {
        decoded = decodeJWT(token);
    }
    const handleLogout = async() =>{
        let confirmed = confirm('Confirm Logout')
        if(confirmed){
            localStorage.removeItem('token');
            navigate('/');
        }
    };
    const [activeTab,setActiveTab] = useState('overview');
    const renderContent = () => {
        switch (activeTab) {
        case 'overview':
            return <Overview token={decoded} />;
        case 'tasks':
            return <Tasks token={decoded} />;
        case 'profile':
            return <Profile token={decoded}/>;
        default:
            return null;
        }
    };
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">

      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold mt-10">Dashboard</h2>
        <nav className="space-y-4 mt-10">
          <button onClick={()=>setActiveTab('overview')} className="block hover:text-blue-400 cursor-pointer">Overview</button>
          <button onClick={()=>setActiveTab('tasks')} className="block hover:text-blue-400 cursor-pointer">Tasks</button>
          <button onClick={()=>setActiveTab('profile')} className="block hover:text-blue-400 cursor-pointer">Profile</button>
        </nav>
      </aside>

      
      <div className="flex-1 flex flex-col">
        
        <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold">Task Manager</h1>
          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg" onClick={handleLogout}>
            Logout
          </button>
        </header>

        
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
