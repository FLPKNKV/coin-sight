"use client"

import { useState } from 'react';
import { FiHome, FiSettings, FiUser } from 'react-icons/fi';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: <FiHome /> },
    { name: 'Profile', icon: <FiUser /> },
    { name: 'Settings', icon: <FiSettings /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 p-3 w-full rounded-lg ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">{activeTab}</h1>
        <p>Content for {activeTab} goes here.</p>
      </main>
    </div>
  );
};

export default Dashboard;
