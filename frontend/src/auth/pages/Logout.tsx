import axios from 'axios'
import React from 'react'
import { NavigateFunction } from 'react-router-dom'

export const  Logout = async (navigate:NavigateFunction)=>{

    try {
        const res = await axios.get('http://localhost:5000/api/user/logout',{
            withCredentials:true
        })
        if(res.data.success){
            navigate('/signin')
        }
    } catch (error) {
        console.log(error)
    }
}

export default Logout