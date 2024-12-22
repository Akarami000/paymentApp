import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../assets/profile.gif'
import { transferBalance } from '../store/user/action';
import Loading from './shared/Loading';

const SendMoney = ({onClose,firstName,lastName,userId}) => {
  const [addAmount,setAddAmount]= useState('');
  
  const dispatch  = useDispatch();
  const {loading,error,payUser} = useSelector((state)=>state.user);
  const handlePay = (e)=>{
    e.preventDefault();
    const payload = {
      to:userId,
      amount:addAmount
    }
    dispatch(transferBalance(payload));
  
  }

  const handleClose = ()=>{
    if(onClose){
      onClose(false);
    }
  }
  const handleChange=(e)=>{
    setAddAmount(e.target.value)
  }
  if (loading) {
    return (<Loading/>);  
  }
  if (error) return <p>Error: {error.msg || "An unexpected error occurred"}</p>;

  return (
    <div  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-orange-600 focus:outline-none"
      >
          X
        </button>
        <label className="block text-2xl font-semibold text-gray-800 mb-4">
          Send Money
        </label>
        
        <div className="flex justify-center items-center">
        {payUser && (payUser.message === "Transfer successful") ? (
          <div className="text-green-500 text-center font-medium">
            {payUser.message}
          </div>
        ):(<div className="text-red-500 text-center font-medium">
       Add the Amount
      </div>)}
      </div>
        
        <img
          src={profile}
          alt="Payee"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <h2 className="text-lg font-medium text-gray-700 text-center mb-2">
         {`${firstName} ${lastName}`}
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">Amount (in Rs)</p>
        <input
          type="text"
          placeholder="Amount to be paid"
          value = {addAmount}
          name = "Amount"
          onChange = {handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button onClick={handlePay} className="w-full bg-green-500 text-white py-2 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Send Money
        </button>
      </div>
    </div>
  );
};

export default SendMoney;