import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TestimonialForm from './TestimonialForm';


interface DashboardBasic{
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
const StandaloneTestimonialForm:React.FC=()=> {
    const[spaceData,setSpaceData] = useState<DashboardBasic| null>(null);
    const[loading,setLoading]= useState(true)
    const[error,setError]= useState<string|null>(null)
    const {id}= useParams<{id:string}>()


    useEffect(()=>{

        const fetchSpaceData= async()=>{
            try {
                const response = await axios.get('http://localhost:5000/api/user/space-data',{
                    params:{id},
                    withCredentials:true
                })
                setSpaceData(response.data.spaceData)
                setLoading(false);
            } catch (error) {
                setError('Failed to load data.Please try again later')
                setLoading(false)
            }
        }
        fetchSpaceData();
    },[id])

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
      }
    
      if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>;
      }
    
      if (!spaceData) {
        return <div className="text-center mt-8">No data available for this form.</div>;
      }

  return (
    <TestimonialForm spaceData={spaceData} standalone={true}/>
  )
}

export default StandaloneTestimonialForm