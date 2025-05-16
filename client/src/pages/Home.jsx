import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <nav className="flex items-center justify-between p-6 bg-gray-800 shadow-md">
        <div className="text-2xl font-bold text-white">Task Manager</div>
        <div className=''>
            <ul className='flex space-x-3'>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
              <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
            </ul>

        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            <Link to="/login" className="hover:text-blue-400 transition">
              Login
            </Link>
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
            <Link to="/signup" className="hover:text-blue-400 transition">
              SignUp
            </Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Stay Organized, Stay Ahead
            </h1>
            <p className="text-gray-300 mb-6 text-lg">
              Your personal task manager to boost productivity, track progress, and meet goals on time.
              Easily manage tasks, collaborate with teammates, and stay in control of your projects.
            </p>
            <div className="space-x-4">
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">
                Get Started
              </Link>
              <Link to="/login" className="border border-blue-600 text-blue-400 hover:text-white px-6 py-3 rounded-lg text-lg transition">
                Login
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="https://media.istockphoto.com/id/1411195926/photo/project-manager-working-on-laptop-and-updating-tasks-and-milestones-progress-planning-with.jpg?s=2048x2048&w=is&k=20&c=d--cQ2K441EZ37SZ_w-0h1czZfTGKqcQXdKuvCrpPss="
              alt="Task Management"
              className="rounded-xl shadow-xl w-full"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
