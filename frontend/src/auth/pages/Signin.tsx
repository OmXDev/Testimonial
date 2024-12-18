import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import Loader from '../../components/ui/Loader';

const Signin: React.FC = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
//   const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
//   const dispatch = useDispatch();

  // Handle input changes
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const signinHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/signin',
        input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        // dispatch(setAuthUser(res.data.user));
        // setToast({ message: res.data.message, type: 'success', visible: true });
        navigate('/');
        setInput({
          email: '',
          password: ''
        });
      }
    } catch (error: any) {
      console.log(error);
    //   setToast({
    //     message: error.response?.data?.message || 'Something went wrong!',
    //     type: 'error',
    //     visible: true
    //   });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-start items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-52 w-auto" src="/Maitri11_processed.jpg" alt="Your Company" />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-4">
        <form onSubmit={signinHandler} className="space-y-6">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={input.email}
              onChange={changeEventHandler}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
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
                Sign In
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center">
          <button className="flex items-center justify-center w-full py-2 px-4">
            <img src="./Google_processed.png" alt="Google Logo" className="h-5 w-5 mr-2" />
            <span className="text-indigo-700 font-semibold">Sign in with Google</span>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-center">
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-6">
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Create an account today
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
