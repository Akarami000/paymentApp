import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBalance, fetchUserDetails } from '../store/user/action';
import { InputBox } from './shared/InputBox';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { persistor } from '../store/user/store.js'; // Import the persistor from your store setup

const DashBoard = () => {
  const [searchWithUserID, setSearchWithUserID] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { user, balance, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails());
    }

    if (!balance) {
      dispatch(fetchUserBalance());
    }
  }, [dispatch, user, balance]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Purge persisted state
    persistor.purge();

    // Redirect to sign-in page
    navigate('/sign-in');
  };

  const handleChange = (e) => {
    setSearchWithUserID(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.msg || "An unexpected error occurred"}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-3xl font-semibold text-gray-800 mb-6">
        <label>Payment APP</label>
      </div>
      <div className="text-lg text-gray-700 mb-4">
        <span>Your Balance: </span>
        <span className="font-bold text-green-500">{balance}</span>
      </div>
      <div className="text-xl text-gray-700 mb-4">
        <label className="font-semibold">
          {user?.firstName} {user?.lastName}
        </label>
      </div>
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"        >
        Logout
      </button>
      <div className="flex space-x-4 mb-6">
        <InputBox
          label={"Search user by ID"}
          placeholder={"enter user ID"}
          type={"searchWithUserID"}
          id={"searchWithUserID"}
          name={'searchWithUserID'}
          data={searchWithUserID}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Pay
        </button>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users Who Paid</h2>
        <ul className="space-y-4">
          {/* Render users list here */}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;