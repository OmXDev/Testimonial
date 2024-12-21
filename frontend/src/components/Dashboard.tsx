// import { useState } from 'react';
// import { IoIosAdd } from "react-icons/io";
// import TestimonialSettingsPopup from './TestimonialSettingsPopup';
// import { useNavigate } from 'react-router-dom';
// import axios, { AxiosResponse } from 'axios';


// interface DashboardBasic {
//   space_name: string;
//   space_logo: string;
//   title: string;
//   custom_message: string;
//   custom_questions: Array<{ question: string }>;
//   collection_type: 'text' | 'video' | 'audio';
//   star_ratings: boolean;
//   Theme: 'light' | 'dark';
//   language: string;
//   showExtraQuestions: boolean;
//   collectExtraInfo: boolean;
//   extra_info: {
//     name?: string;
//     email?: string;
//     title_company?: string;
//     social_link?: string;
//     address?: string;
//     custom_info?: Array<{ fields: string }>;
//   };
// }

// interface SpaceDataResponse {
//   success: boolean;
//   spaceData: DashboardBasic;
// }


// const Dashboard = () => {
//   const [isOpenSpace, setIsOpenSpace] = useState<boolean>(false)
//   const navigate = useNavigate();


//   const openNewSpace = () => {
//     setIsOpenSpace(true)
//   }

//   const closeNewSpace = () => {
//     setIsOpenSpace(false)
//   }


//   const openForm = async (): Promise<void> => {
//     alert('Fetching Dashboard Data...');
//     try {
//       // Call the backend API without passing spaceId in the URL
//       const response: AxiosResponse<SpaceDataResponse> = await axios.get(
//         'http://localhost:5000/api/user/space-data',
//         { withCredentials: true } // Ensures cookies (like JWT) are sent
//       );
  
//       // Extract and log the received spaceData
//       console.log('Response from server:', response.data);
//       console.log('Space Data:', response.data.spaceData);
//     } catch (error) {
//       console.error('Error fetching space data:', error);
//     }
//   };
  
//   //   try {
//   //     const response = await axios.get('http://localhost:5000/api/user/space-id',{
//   //       withCredentials:true,
//   //     })
//   //     const spaceId = response.data.spaceId;
//   //     console.log(spaceId);
//   //     if(spaceId){
//   //       navigate('/')
//   //     }else{
//   //       console.error('Space Id not found')
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to fetch space Id :',error)
//   //   }
//   // }

//   // const openForm = ()=>{
//   //   // const spaceId= user.dashboard.basic._id
//   //   // navigate('/dashboard/space/${spaceId}/testimonial')

//   // }

//   return (
//     <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
//       <header className="w-full ml-6 text-white p-4 text-3xl font-bold">
//         Testimonial
//       </header>
//       <hr className="w-full border-t border-gray-600 mt-1" />
//       <div className="bg-gray-700 w-1/3 h-44 rounded-md mt-14 flex flex-col items-center justify-center">
//         <div className="text-center text-white mb-4">
//           Create your first space to start collecting testimonials
//         </div>
//         <button
//           onClick={openNewSpace}
//           className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200"
//         >
//           <IoIosAdd className='h-6 w-6 mr-2' /> Create a new Space
//         </button>
//       </div>

//       <button className='mt-12 bg-gray-700 h-16 w-60 text-white text-center p-5' onClick={openForm}>
//         See Space
//       </button>
//       {isOpenSpace && <TestimonialSettingsPopup onClose={closeNewSpace} />}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { IoIosAdd } from "react-icons/io";
import TestimonialSettingsPopup from './TestimonialSettingsPopup';
import axios, { AxiosResponse } from 'axios';
import TestimonialForm from './TestimonialForm';
import { Link } from 'react-router-dom';

interface DashboardBasic {
  space_id:string;
  space_name: string;
  space_logo: string;
  title: string;
  custom_message: string;
  custom_questions: Array<{ question: string }>;
  collection_type: 'text' | 'video' | 'audio';
  star_ratings: boolean;
  Theme: 'light' | 'dark';
  language: string;
  showExtraQuestions: boolean;
  collectExtraInfo: boolean;
  extra_info: {
    name?: string;
    email?: string;
    title_company?: string;
    social_link?: string;
    address?: string;
    custom_info?: Array<{ fields: string }>;
  };
}

interface SpaceDataResponse {
  success: boolean;
  spaceData: DashboardBasic;
}

const Dashboard: React.FC = () => {
  const [isOpenSpace, setIsOpenSpace] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [spaceData, setSpaceData] = useState<DashboardBasic | null>(null);
  const [testimonialLink, setTestimonialLink] = useState<string | null>(null);

  const openNewSpace = () => {
    setIsOpenSpace(true);
  }

  const closeNewSpace = () => {
    setIsOpenSpace(false);
  }

  // const openForm = async (): Promise<void> => {
  //   try {
  //     const response: AxiosResponse<SpaceDataResponse> = await axios.get(
  //       'http://localhost:5000/api/user/space-data',
  //       { withCredentials: true }
  //     );
      
  //     console.log('Space Data:', response.data.spaceData);
  //     setSpaceData(response.data.spaceData);
  //     setIsOpenForm(true);
  //   } catch (error) {
  //     console.error('Error fetching space data:', error);
  //   }http://localhost:5173/testimonial/m4v48e7sklvype5juan
  // };

  const generateTestimonialLink= async():Promise<void>=>{
    try {
      const response:AxiosResponse<SpaceDataResponse>= await axios.get(
        'http://localhost:5000/api/user/space-data',{
          withCredentials:true
        }
      )
      console.log('Space Data:',response.data.spaceData);
      setSpaceData(response.data.spaceData)

      const uniqueId = Date.now().toString(36)+ Math.random().toString(36).substring(2);
      const link = `/testimonial/${uniqueId}`
      setTestimonialLink(link)

    } catch (error) {
      console.log('Error fetching data:',error)
    }
  }

  const closeForm = () => {
    setIsOpenForm(false);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4">
      <header className="w-full ml-6 text-white p-4 text-3xl font-bold">
        Testimonial
      </header>
      <hr className="w-full border-t border-gray-600 mt-1" />
      <div className="bg-gray-700 w-1/3 h-44 rounded-md mt-14 flex flex-col items-center justify-center">
        <div className="text-center text-white mb-4">
          Create your first space to start collecting testimonials
        </div>
        <button
          onClick={openNewSpace}
          className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-200"
        >
          <IoIosAdd className='h-6 w-6 mr-2' /> Create a new Space
        </button>
      </div>

      {/* <button 
        className='mt-12 bg-gray-700 h-16 w-60 text-white text-center p-5' 
        onClick={openForm}
      >
        Open Testimonial Form
      </button>*/}
      {isOpenSpace && <TestimonialSettingsPopup onClose={closeNewSpace} />} 

<button 
        className='mt-12 bg-gray-700 h-16 w-60 text-white text-center p-5' 
        onClick={generateTestimonialLink}
      >
        Generate Testimonial Link
      </button>
      {testimonialLink && (
        <div className="mt-4 p-4 bg-white rounded-md">
          <p className="mb-2">Share this link with your customers:</p>
          <Link
            to={testimonialLink} 
            className="text-blue-500 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {window.location.origin + testimonialLink}
          </Link>
        </div>
      )}
      {isOpenForm && spaceData && (
        <TestimonialForm spaceData={spaceData} onClose={closeForm} />
      )}
    </div>
  );
};

export default Dashboard;

