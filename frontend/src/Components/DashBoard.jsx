import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterUser, fetchUserBalance, fetchUserDetails } from '../store/user/action';
import { InputBox } from './shared/InputBox';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Loading from './shared/Loading';
import SendMoney from './SendMoney';
const DashBoard = () => {
  const [searchWithUserID, setSearchWithUserID] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { user, balance,findUser, loading, error } = useSelector((state) => state.user);
  const [isSendMoneyOpen,setIsSendMoneyOpen]= useState(false);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserDetails());
    }

    if (!balance) {
      dispatch(fetchUserBalance());
    }
  }, [dispatch, user, balance]);

  useEffect(()=>{
    setSearchResult(findUser||[])
  },[findUser])
  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to sign-in page
    navigate('/sign-in');
  };
  const handleSearch=()=>{
    if(searchWithUserID){
      dispatch(fetchFilterUser(searchWithUserID));
    }
  }
  const handlePay=(user)=>{
    setIsSendMoneyOpen(true);
    setSelectedUser(user);
    
  }
  const closeHandlePay=(response)=>{
    setIsSendMoneyOpen(false);
  }

  const handleChange = (e) => {
    setSearchWithUserID(e.target.value);
  };

  if (loading) {
    return (<Loading/>);  
  }
  if (error) return <p>Error: {error.msg || "An unexpected error occurred"}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-3xl font-semibold text-gray-800 mb-6">
        <label>Mini Pay</label>
      </div>
      <div className="text-lg text-gray-700 mb-4">
        <span>Your Balance: </span>
        <span className="font-bold text-green-500">{balance}</span>
      </div>
      <div className="text-xl text-gray-700 mb-4">
        <label className="font-semibold">
         User: {user?.firstName} {user?.lastName}
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
      <button onClick={handleSearch}
              className="bg-blue-500 text-white mb-4 mt-8 px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Search
      </button>
      </div>
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users search result</h2>
        <ul className="space-y-4">
          {/* Render users list here */}
          {searchResult.user && searchResult.user.length > 0?(searchResult.user.map((user)=>(
           <li key={user._id} className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
           <div>
             <p className="font-semibold">{user.firstName} {user.lastName}</p>
             <p className="text-sm text-gray-600">{user.email}</p>
           </div>
           <button onClick={()=>handlePay(user)} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none  focus:ring-green-400">
             Pay
           </button>
         </li>
          ))):(
            <p>no user found</p>
          )}
        </ul>
      </div>
    {isSendMoneyOpen && (
      <div>
        <SendMoney onClose={closeHandlePay} firstName={selectedUser.firstName} lastName={selectedUser.lastName} userId={selectedUser._id} />
      </div>
    )}
    </div>
  );
};

export default DashBoard;