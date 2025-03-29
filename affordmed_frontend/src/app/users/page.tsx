"use client";

import { useState, useEffect } from 'react';

interface User {
  user_id: string;
  user_name: string;
  post_count: number;
  engagement_rate?: number;
  last_active?: string;
}

export default function TopUsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchTopUsers();
  }, [timeRange]);

  const fetchTopUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/top-users?range=${timeRange}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const usersWithEngagement = data.map((user: User, index: number) => ({
        ...user,
        engagement_rate: 70 + (index * 5),
        last_active: `${index + 1} day${index > 0 ? 's' : ''} ago`
      }));
      setUsers(usersWithEngagement);
    } catch (err) {
      setError('Failed to fetch top users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="mb-8 p-8 bg-white rounded-lg shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-800 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v12m-4-8h8" />
          </svg>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Community Analytics</h2>
            <p className="text-gray-500">Insights and statistics about top contributors</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md border ${timeRange === 'week' ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${timeRange === 'month' ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${timeRange === 'all' ? 'bg-gray-800 text-white' : 'text-gray-800'}`}
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400">Total Contributors</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-3xl font-bold mb-2">{users.length}</p>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m-8 0v12m-4-4h.01M17 17l-4-4m4 4l-4 4" />
            </svg>
            <p className="text-gray-400">+12% from last {timeRange}</p>
          </div>
        </div>

      </div>

      {/* Leaderboard */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Top Contributors Leaderboard</h3>
          <button className="text-gray-500">View All</button>
        </div>
        {users.map((user, index) => (
          <div key={user.user_id} className={`flex items-center p-4 ${index < 3 ? 'bg-gray-50' : ''} rounded-lg mb-2`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${index === 0 ? 'bg-yellow-500 text-white' : index === 1 ? 'bg-gray-400 text-white' : index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {index + 1}
            </div>
            <div className="flex items-center mr-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
                {user.user_name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800">{user.user_name}</p>
              <p className="text-gray-500">Last active: {user.last_active || 'Recently'}</p>
            </div>
            <div className="flex items-center space-x-6 mr-4">
              <div className="text-center">
                <p className="text-gray-500">Posts</p>
                <p className="font-semibold text-gray-800">{user.post_count}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Engagement</p>
                <p className="font-semibold text-gray-800">{user.engagement_rate}%</p>
              </div>
            </div>
            <button className="border text-gray-800 px-4 py-2 rounded-md">View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}
