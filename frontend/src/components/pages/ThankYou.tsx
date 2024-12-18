import React, { useState, ChangeEvent } from 'react';

export default function ThankYouPage() {
  const [settings, setSettings] = useState({
    showImage: true,
    imageSrc: '/placeholder.svg?height=200&width=200',
    thankYouTitle: 'Thank You for Your Testimonial!',
    thankYouMessage: 'We appreciate you taking the time to share your experience.',
    allowSocialShare: true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, imageSrc: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Thank You Page Settings:', settings);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Thank You Page Settings</h2>
        <p className="mt-1 text-sm text-gray-600">Customize the thank you page for testimonial submissions</p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="showImage"
                name="showImage"
                type="checkbox"
                checked={settings.showImage}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="showImage" className="ml-2 block text-sm text-gray-900">
                Show Image
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="imageUpload"
                name="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Image
              </label>
            </div>
          </div>
          {settings.showImage && (
            <div className="mt-2">
              <img
                src={settings.imageSrc}
                alt="Thank you"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="thankYouTitle" className="block text-sm font-medium text-gray-700">Thank You Title</label>
          <input
            id="thankYouTitle"
            name="thankYouTitle"
            type="text"
            value={settings.thankYouTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="thankYouMessage" className="block text-sm font-medium text-gray-700">Thank You Message</label>
          <textarea
            id="thankYouMessage"
            name="thankYouMessage"
            value={settings.thankYouMessage}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center">
          <input
            id="allowSocialShare"
            name="allowSocialShare"
            type="checkbox"
            checked={settings.allowSocialShare}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="allowSocialShare" className="ml-2 block text-sm text-gray-900">
            Allow sharing on social media
          </label>
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

