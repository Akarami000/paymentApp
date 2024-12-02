import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { CreateUser } from '../store/user/action';



const SignUp = () => {
    const dispatch = useDispatch();
    const {loading,error,user} = useSelector((state)=>state.user);


    const [formData,setFromData]= useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })


    const handleChange=(e)=>{
        setFromData({
            ...formData,[e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
       const userData = formData;
       dispatch(CreateUser(userData));
    }

    return (
      <div className="h-screen flex justify-center items-center bg-gray-900">
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              placeholder="Enter your first name"
              name='firstName'
              value={formData.firstName}
              onChange = {handleChange}
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              placeholder="Enter your first name"
              name='lastName'
              value={formData.lastName}
              onChange = {handleChange}
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
              name='email'
              value={formData.email}
              onChange = {handleChange}
              
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              placeholder="Enter your password"
              name='password'
              value={formData.password}
              onChange = {handleChange}
            />
          </div>

          
          <button
            type="submit"
            className="w-full  bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            disabled ={loading}
          >
            {loading ?"Creating user ...":"Sign-up"}
          </button>
        </form>
      </div>
    );
  };
  
export default SignUp;