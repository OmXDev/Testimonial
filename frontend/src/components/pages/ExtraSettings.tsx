import React, { useState } from 'react';

export default function ExtraSettings() {
  const [settings, setSettings] = useState({
    maxVideoDuration: 60,
    maxTextDuration: 500,
    videoButtonText: 'Record Video',
    textButtonText: 'Submit Text',
    consentDisplay: true,
    consentStatement: 'I agree to share my testimonial',
    textSubmissionTitle: 'Share Your Experience'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = () => {
    setSettings(prev => ({ ...prev, consentDisplay: !prev.consentDisplay }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings submitted:', settings);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Extra Settings for Testimonials</h2>
        <p className="mt-1 text-sm text-gray-600">Configure additional settings for your testimonial collection</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="maxVideoDuration" className="block text-sm font-medium text-gray-700">Max Video Duration (seconds)</label>
            <input
              id="maxVideoDuration"
              name="maxVideoDuration"
              type="number"
              value={settings.maxVideoDuration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="maxTextDuration" className="block text-sm font-medium text-gray-700">Max Text Length (characters)</label>
            <input
              id="maxTextDuration"
              name="maxTextDuration"
              type="number"
              value={settings.maxTextDuration}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="videoButtonText" className="block text-sm font-medium text-gray-700">Video Button Text</label>
            <input
              id="videoButtonText"
              name="videoButtonText"
              type="text"
              value={settings.videoButtonText}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="textButtonText" className="block text-sm font-medium text-gray-700">Text Button Text</label>
            <input
              id="textButtonText"
              name="textButtonText"
              type="text"
              value={settings.textButtonText}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <input
              id="consentDisplay"
              name="consentDisplay"
              type="checkbox"
              checked={settings.consentDisplay}
              onChange={handleSwitchChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="consentDisplay" className="ml-2 block text-sm text-gray-900">
              Display Consent
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="consentStatement" className="block text-sm font-medium text-gray-700">Consent Statement</label>
          <textarea
            id="consentStatement"
            name="consentStatement"
            value={settings.consentStatement}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="textSubmissionTitle" className="block text-sm font-medium text-gray-700">Text Submission Title</label>
          <input
            id="textSubmissionTitle"
            name="textSubmissionTitle"
            type="text"
            value={settings.textSubmissionTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

