import React, { useState } from 'react';
import axios from 'axios';

interface TestimonialFormProps {
  spaceData: {
    space_id: string;
    space_name: string;
    title: string;
    custom_message: string;
    custom_questions: Array<{ question: string }>;
    star_ratings: boolean;
    collectExtraInfo: boolean;
    extra_info: {
      name?: string;
      email?: string;
      title_company?: string;
      social_link?: string;
      address?: string;
      custom_info?: Array<{ fields: string }>;
      [key: string]: any;
    };
  };
  onClose?: () => void;
  standalone?: boolean;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ spaceData, onClose, standalone = false }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [rating, setRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const testimonialData = {
        spaceId: spaceData.space_id,
        rating: rating > 0 ? rating : undefined,
        answers: spaceData.custom_questions.map((q, index) => ({
          question: q.question,
          answer: formData[`question_${index}`] || ''
        })),
        extra_info: {} as Record<string, any>
      };

      if (spaceData.collectExtraInfo) {
        if (spaceData.extra_info.name) testimonialData.extra_info.name = formData.name;
        if (spaceData.extra_info.email) testimonialData.extra_info.email = formData.email;
        if (spaceData.extra_info.title_company) testimonialData.extra_info.title_company = formData.title_company;
        if (spaceData.extra_info.social_link) testimonialData.extra_info.social_link = formData.social_link;
        if (spaceData.extra_info.address) testimonialData.extra_info.address = formData.address;
        if (spaceData.extra_info.custom_info) {
          testimonialData.extra_info.custom_info = spaceData.extra_info.custom_info.map((field, index) => ({
            field: field.fields,
            value: formData[`custom_${index}`] || ''
          }));
        }
      }

      // Remove empty fields
      Object.keys(testimonialData.extra_info as Record<string, any>).forEach(key => 
        (testimonialData.extra_info as Record<string, any>)[key] === undefined && delete (testimonialData.extra_info as Record<string, any>)[key]
      );
      // if (Object.keys(testimonialData.extra_info).length === 0) {
      //   delete testimonialData.extra_info;
      // }

      console.log('Sending testimonial data:', JSON.stringify(testimonialData, null, 2));

      const response = await axios.post('http://localhost:5000/api/user/submit-testimonial', testimonialData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      console.log('Server response:', response.data);

      if (response.data.success) {
        setSubmitted(true);
      } else {
        throw new Error(response.data.message || 'Failed to submit testimonial');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Server error response:', err.response.data);
        setError(`Failed to submit testimonial: ${err.response.data.message || err.message}`);
      } else {
        console.error('Error submitting testimonial:', err);
        setError('Failed to submit testimonial. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p>Your testimonial has been submitted successfully.</p>
          {!standalone && (
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${standalone ? 'min-h-screen bg-gray-100' : 'fixed inset-0 bg-black bg-opacity-50'} flex justify-center items-center p-4`}>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-4">{spaceData.title}</h2>
        <p className="mb-4">{spaceData.custom_message}</p>
        <form onSubmit={handleSubmit}>
          {spaceData.star_ratings && (
            <div className="mb-4">
              <label className="block mb-2">Rating:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          )}

          {spaceData.custom_questions.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2">{q.question}</label>
              <textarea
                name={`question_${index}`}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
          ))}

          {spaceData.collectExtraInfo && (
            <>
              {spaceData.extra_info.name && (
                <div className="mb-4">
                  <label className="block mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              {spaceData.extra_info.email && (
                <div className="mb-4">
                  <label className="block mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              {spaceData.extra_info.title_company && (
                <div className="mb-4">
                  <label className="block mb-2">Title/Company:</label>
                  <input
                    type="text"
                    name="title_company"
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              {spaceData.extra_info.social_link && (
                <div className="mb-4">
                  <label className="block mb-2">Social Link:</label>
                  <input
                    type="url"
                    name="social_link"
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              {spaceData.extra_info.address && (
                <div className="mb-4">
                  <label className="block mb-2">Address:</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              )}
              {spaceData.extra_info.custom_info?.map((field, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">{field.fields}:</label>
                  <input
                    type="text"
                    name={`custom_${index}`}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </>
          )}

          {error && (
            <div className="mb-4 text-red-500">{error}</div>
          )}

          <div className="flex justify-end mt-6">
            {!standalone && (
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;

