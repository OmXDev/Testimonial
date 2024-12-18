
'use client';

import React, { useState } from 'react';
import Basic from './pages/Basic';
import ExtraSettings from './pages/ExtraSettings';
import ThankYouPage from './pages/ThankYou';
import { IoClose } from 'react-icons/io5';

type ActiveComponent = 'basic' | 'extraSettings' | 'thankYouPage';

interface TestimonialSettingsPopupProps {
  onClose: () => void; // Define onClose as a required prop
}

const TestimonialSettingsPopup: React.FC<TestimonialSettingsPopupProps> = ({ onClose }) => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('basic');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'basic':
        return <Basic />;
      case 'extraSettings':
        return <ExtraSettings />;
      case 'thankYouPage':
        return <ThankYouPage />;
      default:
        return null;
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      {/* Popup Container */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Testimonial Settings</h2>
          {/* Close Button */}
          <IoClose
            onClick={onClose}
            className="absolute top-4 right-4 h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"
          />
        </div>
        <div className="bg-gray-200 px-6 py-2 border-b border-gray-300">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveComponent('basic')}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeComponent === 'basic'
                  ? 'bg-white text-indigo-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setActiveComponent('extraSettings')}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeComponent === 'extraSettings'
                  ? 'bg-white text-indigo-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Extra Settings
            </button>
            <button
              onClick={() => setActiveComponent('thankYouPage')}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                activeComponent === 'thankYouPage'
                  ? 'bg-white text-indigo-600'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Thank You Page
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default  TestimonialSettingsPopup;

