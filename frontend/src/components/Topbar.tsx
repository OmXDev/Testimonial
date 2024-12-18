import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Logout from '../auth/pages/Logout';

function openCustomers() {
    return (
        <div>

        </div>
    )
}

function Topbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const logoutHandler= async ()=>{
        try {
            Logout(navigate)
        } catch (error) {
            console.log(error)
        }
    }

    const openCustomers = async () => {

    }
    return (
        <header className='bg-slate-900 text-white shadow-lg'>
            <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
                <div className='text-2xl font-semibold'>
                    Testimonial
                </div>
                <div className=' hidden lg:block'>
                    <nav >
                        <ul className='flex space-x-6'>
                            <li>
                                <a href='#customers' onClick={openCustomers} className='hover:text-cyan-400'>Customers</a>
                            </li>
                            <li>
                                <a href="#features" className='hover:text-cyan-400'>
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className='hover:text-cyan-400'>
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#integration" className='hover:text-cyan-400'>
                                    Integration</a>
                            </li>


                        </ul>
                    </nav>
                </div>
                <div className='relative inline-block text-left' ref={dropdownRef}>
                    <div className='w-10 h1-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300'
                        onClick={toggleDropdown}
                    >
                        <img src="" alt="Profile" className='w-full h-full object-cover' />
                    </div>
                    {isOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-10'>
                            <ul className='py-1 text-white'>
                                <li>
                                    <a href="/dashboard" className='block px-4 py-2 hover:bg-gray-600'> Dashboard</a>
                                </li>
                                <li>
                                    <a href="/upgrade" className='block px-4 py-2 hover:bg-gray-600'>Upgrade</a>
                                </li>
                                <li>
                                    <a href="/settings" className='block px-4 py-2 hover:bg-gray-600'>Settings</a>
                                </li>
                                <li>
                                    <a href="/affiliate" className='block px-4 py-2 hover:bg-gray-600'>Become our affiliate</a>
                                </li>
                                <li>
                                    <a href="/rewards" className='block px-4 py-2 hover:bg-gray-600'>Reward account</a>
                                </li>
                                <li>
                                    <a  onClick={logoutHandler} className='block px-4 py-2 hover:bg-gray-600'>Sign out</a>
                                </li>
                                <li>
                                    <a href="/signup" className='block px-4 py-2 hover:bg-gray-600'>Sign up</a>
                                </li>
                                <li>
                                    <a href="/signin" className='block px-4 py-2 hover:bg-gray-600'>Sign in</a>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>

            </div>
            <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        </header>
    )
}

export default Topbar