import axios from 'axios';
import React, { useState } from 'react';

export default function Basic() {
  const [settings, setSettings] = useState({
    space_name: '',
    space_logo: '',
    title: '',
    custom_message: '',
    custom_questions: [
      { question: 'Who are You?' },
      { question: 'How has our Product or service helped you?' },
      { question: 'What is the best thing about our product/Service?' }
    ],
    showExtraQuestions: false,
    collectExtraInfo: false,
    collection_type: 'text',
    star_ratings: true,
    Theme: 'light',
    language: 'en'
  });

  const [extraQuestions, setExtraQuestions] = useState(['', '', '', '', '']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...settings.custom_questions];
    newQuestions[index] = { question: value };
    setSettings(prev => ({ ...prev, custom_questions: newQuestions }));
  };

  const handleExtraQuestionChange = (index: number, value: string) => {
    const newExtraQuestions = [...extraQuestions];
    newExtraQuestions[index] = value;
    setExtraQuestions(newExtraQuestions);
  };

  const toggleExtraQuestions = () => {
    setSettings(prev => ({ ...prev, showExtraQuestions: !prev.showExtraQuestions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allSettings = {
      ...settings,
      custom_questions: [
        ...settings.custom_questions,
        ...(settings.showExtraQuestions 
          ? extraQuestions.filter(q => q !== '').map(q => ({ question: q })) 
          : [])
      ]
    };
    console.log('Sending Basic Settings:', JSON.stringify(allSettings, null, 2));

    try {
      const res = await axios.post('http://localhost:5000/api/user/dashboard/addbasic', 
        { basic: allSettings },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        alert("Basic Settings Saved");
      } else {
        console.error('Server responded with an error:', res.data);
        alert("Failed to save settings: " + res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        alert(`Error saving settings: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred while saving settings");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Space</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="space_name" className="block text-sm font-medium text-gray-700">Space Name</label>
            <input
              id="space_name"
              name="space_name"
              type="text"
              value={settings.space_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="space_logo" className="block text-sm font-medium text-gray-700">Space Logo</label>
            <input
              id="space_logo"
              name="space_logo"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload logic here
                  console.log('File selected:', file.name);
                  // You might want to update the settings.space_logo with the file or its URL here
                }
              }}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Header Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={settings.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="custom_message" className="block text-sm font-medium text-gray-700">Your Custom Message</label>
          <textarea
            id="custom_message"
            name="custom_message"
            value={settings.custom_message}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Questions</h3>
          {settings.custom_questions.map((question, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={toggleExtraQuestions}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {settings.showExtraQuestions ? '- Hide' : '+ Add'} Extra Questions (up to 5)
          </button>
          {settings.showExtraQuestions && (
            <div className="mt-2 space-y-2">
              {extraQuestions.map((question, index) => (
                <input
                  key={index}
                  type="text"
                  value={question}
                  onChange={(e) => handleExtraQuestionChange(index, e.target.value)}
                  placeholder={`Extra question ${index + 1}`}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="collectExtraInfo"
            name="collectExtraInfo"
            type="checkbox"
            checked={settings.collectExtraInfo}
            onChange={(e) => setSettings(prev => ({ ...prev, collectExtraInfo: e.target.checked }))}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="collectExtraInfo" className="ml-2 block text-sm text-gray-900">
            Collect extra information
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="collection_type" className="block text-sm font-medium text-gray-700">Collection Type</label>
            <select
              id="collection_type"
              name="collection_type"
              value={settings.collection_type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="star_ratings"
              name="star_ratings"
              type="checkbox"
              checked={settings.star_ratings}
              onChange={(e) => setSettings(prev => ({ ...prev, star_ratings: e.target.checked }))}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="star_ratings" className="ml-2 block text-sm text-gray-900">
              Include star rating
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="Theme" className="block text-sm font-medium text-gray-700">Theme</label>
            <select
              id="Theme"
              name="Theme"
              value={settings.Theme}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              {/* Add more language options as needed */}
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Space
          </button>
        </div>
      </form>
    </div>
  );
}

