import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  phone: string;
  institution: string;
  tShirtSize: 'sm' | 'l' | 'xl' | 'xxl';
};

type Segment = {
  id: string;
  name: string;
};

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'entry'>('users');

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/segments');
        setSegments(response.data);
      } catch {
        setError('Error fetching segments');
      }
    };
    fetchSegments();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/users', {
            params: selectedSegment !== 'all' ? { segmentId: selectedSegment } : {},
          });
          setUsers(response.data);
        } catch {
          setError('Error fetching users');
        }
      };
      fetchUsers();
    }
  }, [selectedSegment, activeTab]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-indigo-700">Admin Panel</h1>
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-md font-semibold focus:outline-none transition-colors duration-200 ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow' : 'bg-indigo-100 text-indigo-700'}`}
          onClick={() => setActiveTab('users')}
        >Users</button>
        <button
          className={`px-4 py-2 rounded-t-md font-semibold focus:outline-none transition-colors duration-200 ${activeTab === 'entry' ? 'bg-indigo-600 text-white shadow' : 'bg-indigo-100 text-indigo-700'}`}
          onClick={() => setActiveTab('entry')}
        >Entry Monitor</button>
      </div>
      {activeTab === 'users' && (
        <>
          <div className="mb-4">
            <select value={selectedSegment} onChange={e => setSelectedSegment(e.target.value)} className="w-full border rounded px-3 py-2 bg-white text-gray-800 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="all">All Segments</option>
              { segments.map(segment => (
                <option key={segment.id} value={segment.id}>{segment.name}</option>
              ))}
            </select>
          </div>
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="py-2 px-4 font-semibold">Name</th>
                <th className="py-2 px-4 font-semibold">Phone</th>
                <th className="py-2 px-4 font-semibold">Institution</th>
                <th className="py-2 px-4 font-semibold">T-Shirt Size</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={idx % 2 === 0 ? "bg-indigo-50 text-indigo-900" : "bg-white text-indigo-800"}>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">{user.institution}</td>
                  <td className="py-2 px-4 font-bold">{user.tShirtSize.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
            {error && <p className="text-red-500 w-full text-center p-2">{error}</p>}
          </table>
        </>
      )}
      {activeTab === 'entry' && (
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">Entry Monitor</h2>
          <div className="mb-4">
            <label htmlFor="segment-select" className="block mb-2 text-indigo-700 font-medium">Select Segment</label>
            <select
              id="segment-select"
              value={selectedSegment}
              onChange={e => setSelectedSegment(e.target.value)}
              className="w-full border border-indigo-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Segments</option>
              {segments.map(segment => (
                <option key={segment.id} value={segment.id}>{segment.name}</option>
              ))}
            </select>
          </div>
          <button
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            onClick={() => window.location.href = `/adminscan?segment=${selectedSegment}`}
          >
            Start Scan Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;