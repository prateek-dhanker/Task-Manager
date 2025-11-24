import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react';

const Overview = (props) => {
  const token = props.token
  const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      axios.get('${process.env.REACT_APP_API_URL}/api/tasks/all')
        .then(res => {
          if(token.admin)
            setTasks(res.data)
          else{
            const myTasks = res.data.filter(task => task.assignedTo === token.username);
            setTasks(myTasks);
          }
        })
        .catch(err => console.error(err));
  
    },[]);
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8 min-w-2xl mx-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Dashboard Overview</h1>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-300">Total Tasks</h2>
            <p className="text-3xl font-bold text-blue-400 mt-2">{tasks.length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-300">Completed</h2>
            <p className="text-3xl font-bold text-green-400 mt-2">{tasks.filter(task => task.status === 'Completed').length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-300">In Progress</h2>
            <p className="text-3xl font-bold text-yellow-400 mt-2">{tasks.filter(task => task.status === 'In Progress').length}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-300">Pending</h2>
            <p className="text-3xl font-bold text-red-400 mt-2">{tasks.filter(task => task.status === 'Pending').length}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">✨ Welcome back!</h2>
          <p className="text-gray-200">
            "The secret of getting ahead is getting started." – Mark Twain
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Start by reviewing your pending tasks or add a new one to stay productive.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Overview;
