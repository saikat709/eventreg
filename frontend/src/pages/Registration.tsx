import React, { useState } from 'react';
import axios from 'axios';

const tShirtSizes = [
  { value: 'sm', label: 'SM' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' },
];
const segments = [
  { value: 'math_quiz', label: 'Math Quiz' },
  { value: 'food', label: 'Food' },
  { value: 'project_showcasing', label: 'Project Showcasing' },
];

type FormData = {
  name: string;
  phone: string;
  address: string;
  age: string;
  institution: string;
  tShirtSize: string;
  segment: string;
  password: string;
  confirmPassword: string;
};

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    age: '',
    institution: '',
    tShirtSize: '',
    segment: '',
    password: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.address || !formData.age || !formData.institution) {
        setError('Please fill all fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.tShirtSize || !formData.segment) {
        setError('Please select t-shirt size and segment');
        return;
      }
      setStep(3);
    }
  };

  const handlePrev = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', formData);
      setSuccess(response.data.message);
      setFormData({
        name: '',
        phone: '',
        address: '',
        age: '',
        institution: '',
        tShirtSize: '',
        segment: '',
        password: '',
        confirmPassword: '',
      });
      setStep(1);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Register for the Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {step === 1 && (
          <>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <button type="button" onClick={handleNext} className="w-full bg-indigo-600 text-white py-2 rounded">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <select name="tShirtSize" value={formData.tShirtSize} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select T-Shirt Size</option>
              {tShirtSizes.map(size => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
            <select name="segment" value={formData.segment} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">Select Segment</option>
              {segments.map(seg => (
                <option key={seg.value} value={seg.value}>{seg.label}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button type="button" onClick={handlePrev} className="flex-1 bg-gray-300 py-2 rounded">Back</button>
              <button type="button" onClick={handleNext} className="flex-1 bg-indigo-600 text-white py-2 rounded">Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <input name="confirmPassword" placeholder="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full bg-white border border-indigo-300 text-gray-800 placeholder-gray-500 rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500" />
            <div className="flex gap-2">
              <button type="button" onClick={handlePrev} className="flex-1 bg-gray-300 py-2 rounded">Back</button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Register</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Registration;