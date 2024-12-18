import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import axios from 'axios';

function SignUp() {
  const [input, setInput] = useState({
    firstname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Change Event Handler with correct typing
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Signup Handler with correct typing
  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/register',
        input,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate('/'); // Navigate to homepage after successful signup
        setInput({
          firstname: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-slate-900'>
    <div className="flex min-h-screen flex-col justify-start items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-52 w-auto"
          src="https://www.mediaheroes.com.au/wp-content/uploads/2023/09/website-testimonials-media-heroes-banner.webp"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign up for an account
        </h2>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-4">
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={signupHandler}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                placeholder="First Name"
                value={input.firstname}
                onChange={changeEventHandler}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                value={input.email}
                onChange={changeEventHandler}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={input.password}
                onChange={changeEventHandler}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex justify-center">
              {loading ? (
                <Loader /> 
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              )}
            </div>

            <div className="flex items-center justify-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-900">Or sign up with</span>
              <hr className="flex-grow border-gray-300" />
            </div>
          </form>

          <div className="flex flex-col space-y-4 mt-4">
            <button className="flex items-center justify-center w-full py-2 px-4">
              <img
                src="./Google_processed.png"
                alt="Google Logo"
                className="h-5 w-5 mr-2"
              />
              <span className="text-indigo-700 font-semibold">
                Sign up with Google
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-6">
        <p className="mt-3 text-center text-sm text-gray-500">
          Already a member?
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign in to your account
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default SignUp;
