// import { useState } from 'react'
// import Topbar from './components/Topbar'
// import HeroSection from './components/HeroSection'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Dashboard from './components/Dashboard'
import SignUp from './auth/pages/SignUp'
import Signin from './auth/pages/Signin'
import StandaloneTestimonialForm from './components/StandaloneTestimonialForm'
// import TestimonialForm from './components/shared/TestimonialForm'
// import SpaceLinkGenerator from './components/shared/SpaceLinkGenerator'


const browserRouter = createBrowserRouter([
  {
    path:'/',
  element:<RootLayout/>,
},
{
  path:'/dashboard',
  element:<Dashboard/>,
},
{
  path:'/signup',
  element:<SignUp/>
},
{
  path:'/signin',
  element:<Signin/>
},
{
  
    path:'/testimonial/:id',
    element:<StandaloneTestimonialForm/>
  
}
])

function App() {


  return (
    <>
    <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
