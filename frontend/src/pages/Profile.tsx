import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

interface User {
  id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  institution: string;
  tShirtSize: 'sm' | 'l' | 'xl' | 'xxl';
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError((err)?.response?.data?.message || 'An error occurred');
      }
    };
    if (accessToken) {
      fetchUser();
    } else {
      // Demo data fallback
      setUser({
        id: 'demo',
        name: 'Demo User',
        phone: '0123456789',
        address: '123 Demo Street',
        age: 21,
        institution: 'Demo University',
        tShirtSize: 'xl',
      });
    }
  }, [accessToken]);

  const handleDownloadIdCard = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/id-card/download', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${user?.name}_ID_Card.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'An error occurred');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleEdit = () => {
    setEditData(user);
    setEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editData) return;
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const response = await axios.put('http://localhost:3001/api/users/me', editData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
      setEditing(false);
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Profile</h1>
      {!editing ? (
        <>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Institution:</strong> {user.institution}</p>
            <p><strong>T-Shirt Size:</strong> {user.tShirtSize.toUpperCase()}</p>
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={handleEdit} className="w-1/2 bg-yellow-500 text-white hover:bg-yellow-600">Edit</Button>
            <Button onClick={handleDownloadIdCard} className="w-1/2">Download ID Card</Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSave} className="space-y-4">
          <input name="name" value={editData?.name || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" placeholder="Name" required />
          <input name="phone" value={editData?.phone || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" placeholder="Phone" required />
          <input name="address" value={editData?.address || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" placeholder="Address" required />
          <input name="age" type="number" value={editData?.age || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" placeholder="Age" required />
          <input name="institution" value={editData?.institution || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" placeholder="Institution" required />
          <select name="tShirtSize" value={editData?.tShirtSize || ''} onChange={handleEditChange} className="w-full border border-indigo-300 rounded px-3 py-2" required>
            <option value="sm">SM</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
          <div className="flex gap-2">
            <Button type="button" onClick={() => setEditing(false)} className="w-1/2 bg-gray-300 text-gray-800 hover:bg-gray-400">Cancel</Button>
            <Button type="submit" disabled={saving} className="w-1/2 bg-green-600 text-white hover:bg-green-700">{saving ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Profile;