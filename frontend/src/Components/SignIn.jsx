import React, { useEffect } from 'react';
import { useState } from 'react';
import { Bottom } from './shared/Bottom';
import { Button } from './shared/Button';
import { Heading } from './shared/Heading';
import { InputBox } from './shared/InputBox';
import {useDispatch,useSelector} from 'react-redux';
import { LoginUser,fetchUserDetails } from '../store/user/action.js';
import { ErrorMessage,SideErrorMessage } from './shared/ErrorMessage';
import { clearError } from '../store/user/reducer.js';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

   
    const {loading,error,user} = useSelector((state)=>state.user);
    const [formData,setFromData] = useState({
        email:'',
        password:''
    })
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]); //its like component unmount 

   
    const handleChange =(e)=>{
        setFromData({...formData,[e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const userData = formData;
        dispatch(LoginUser(userData))
        .unwrap() //he .unwrap() method lets you work with the raw value of the Promise (i.e., the payload or error) rather than the action object.
        .then((res) => {
            dispatch(fetchUserDetails(res.token));
            localStorage.removeItem('bearerToken');
            localStorage.setItem('bearerToken',res.token)
            navigate('/dashboard');
        }).catch((err)=>{
            console.error(err);
        });
    }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
    <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    onSubmit={handleSubmit}
    >
      <Heading label={"Sign-In"}/>
      <ErrorMessage message={error ? error.message:null}/>
      <br/>
      <SideErrorMessage
            message={
                error && error.errors
                    ? error.errors.find(val => val.path === 'email')?.msg
                    : null
            }
        />  
        <InputBox label={"Email"} 
                placeholder={"Enter your email"}
                type={"email"}
                id={"email"} 
                name={'email'} 
                data={formData.email} 
                onChange={handleChange} />
      <InputBox label={"Password"} 
                placeholder={"Enter your password"}
                type={"password"}
                id={"password"} 
                name={'password'} 
                data={formData.password} 
                onChange={handleChange} />
      
    <Button loading={loading} loadingValue ={"Loading ..."} signUp={"Sign-In"}  /> 
   <Bottom message= {"I don't have account "} name={"Sign-Up"} link={'/sign-up'} />
    </form>
    
  </div>
  );
};

export default SignIn;