import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Space {
  space_name: string;
  space_logo: string;
  title: string;
  custom_message: string;
  custom_questions: { question: string }[];
  extra_info: {
    name: string;
    email?: string;
    title_company?: string;
    social_link?: string;
    address?: string;
    custom_info: { fields: string }[];
    collection_type?: string;
    star_ratings?: boolean;
    Theme?: boolean;
  };
}

const GetDashboard = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const navigate = useNavigate();

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/getdashboard', {
          withCredentials: true,
        });
        setSpaces(response.data.basic || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleBack = () => {
    setSelectedSpace(null);
  };

  const goBackToMainDashboard = () => {
    navigate('/dashboard'); // Navigate back to the main dashboard
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <header className="w-full ml-6 text-white p-4 text-3xl font-bold">Dashboard</header>
      <hr className="w-full border-t border-gray-600 mt-1" />

      {loading ? (
        <div className="text-white mt-8">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-8">{error}</div>
      ) : selectedSpace ? (
        // Show selected space details
        <div className="bg-gray-700 w-full max-w-2xl p-6 rounded-md text-white">
          <button onClick={handleBack} className="text-blue-500 underline mb-4">Back</button>
          <h2 className="text-2xl font-bold mb-4">{selectedSpace.title}</h2>
          <p><strong>Space Name:</strong> {selectedSpace.space_name}</p>
          <p><strong>Custom Message:</strong> {selectedSpace.custom_message}</p>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Custom Questions:</h3>
            <ul>
              {selectedSpace.custom_questions.map((q, index) => (
                <li key={index} className="ml-4 list-disc">{q.question}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        // Show list of spaces
        <>
          <button onClick={goBackToMainDashboard} className="text-blue-500 underline mb-6">
            Back to Dashboard
          </button>
          <h2 className="text-white text-2xl mb-4">Spaces</h2>
          {spaces.length > 0 ? (
            <ul className="space-y-4">
              {spaces.map((space, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedSpace(space)}
                  className="bg-gray-700 p-4 rounded-md text-white cursor-pointer hover:bg-gray-600 transition"
                >
                  <div className="font-bold">{space.title}</div>
                  <div>{space.space_name}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-400">No spaces available</div>
          )}
        </>
      )}
    </div>
  );
};

export default GetDashboard;
