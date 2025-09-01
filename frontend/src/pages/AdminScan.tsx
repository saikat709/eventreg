import React, { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Segment {
  id: string;
  name: string;
}

const AdminScan: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/segments');
        setSegments(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'An error occurred');
      }
    };

    fetchSegments();
  }, []);

  const handleScan = async (result: string) => {
    setScanResult(result);
    setError(null);
    setSuccess(null);

    if (!selectedSegment) {
      setError('Please select a segment first');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/registrations/attendance',
        {
          userId: result,
          segmentId: selectedSegment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <div className="mb-4">
        <Select onValueChange={(value) => setSelectedSegment(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Segment" />
          </SelectTrigger>
          <SelectContent>
            {segments.map(segment => (
              <SelectItem key={segment.id} value={segment.id}>{segment.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <div style={{ width: '500px', height: '500px' }}>
        <Scanner onScan={handleScan} />
      </div>

      {scanResult && <p>Last scan: {scanResult}</p>}
    </div>
  );
};

export default AdminScan;