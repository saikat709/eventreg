import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', formData);
      const { accessToken, refreshToken } = response.data;
      setTokens(accessToken, refreshToken);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <p className="text-red-500 text-center" role="alert">{error}</p>}
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
            className="bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            className="bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md">
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-700 font-medium">Don't have an account?</span>{' '}
          <button
            type="button"
            className="text-indigo-600 font-bold hover:underline hover:text-indigo-800 transition-colors duration-200"
            onClick={() => navigate('/registration')}
          >
            Register
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
};

export default Login;
