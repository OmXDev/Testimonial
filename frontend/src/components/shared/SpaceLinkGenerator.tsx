import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SpaceLinkGeneratorProps {
  userId: string;
  onLinkGenerated: (generatedLink: string) => Promise<void>;
}

const SpaceLinkGenerator: React.FC<SpaceLinkGeneratorProps> = ({ userId, onLinkGenerated }) => {
  const [spaceLink, setSpaceLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000';

  const generateLink = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/user/space/generate-link`, { userId });
      const generatedLink = response.data.link;

      setSpaceLink(generatedLink);
      setError(null); // Clear previous errors

      // Call the callback
      await onLinkGenerated(generatedLink);

      // Navigate if required (optional)
      // navigate('/dashboard/space/generate-link');
    } catch (error) {
      console.error('Error generating space link:', error);
      setError('Failed to generate link. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={generateLink}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Generate Testimonial Link
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {spaceLink && (
        <div className="mt-4">
          <p>Share this link with your customers:</p>
          <input
            type="text"
            value={spaceLink}
            readOnly
            className="w-full px-3 py-2 border rounded-md mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default SpaceLinkGenerator;
