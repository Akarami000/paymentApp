import React,{useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { CreateUser } from '../store/user/action.js';
import { clearError } from '../store/user/reducer';
import { Bottom } from './shared/Bottom';
import { Button } from './shared/Button';
import { ErrorMessage, SideErrorMessage } from './shared/ErrorMessage';
import { Heading } from './shared/Heading';
import { InputBox } from './shared/InputBox';



const SignUp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);
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
          <Heading label={"Sign-up"}/>
          <ErrorMessage message={error ? error.message:null}/>
          <br/>
          <SideErrorMessage
                message={
                    error && error.errors
                        ? error.errors.find(val => val.path === 'firstName')?.msg
                        : null
                }
            />          
    <InputBox label={"First Name"} 
                    placeholder={"Enter your first name"}
                    type={"text"}
                    id={"firstName"} 
                    name={'firstName'} 
                    data={formData.firstName} 
                    method={handleChange} />
    <SideErrorMessage
        message={
            error && error.errors
                ? error.errors.find(val => val.path === 'lastName')?.msg
                : null
        }
    />        <InputBox label={"Last Name"} 
                    placeholder={"Enter your last name"}
                    type={"text"}
                    id={"lastName"} 
                    name={'lastName'} 
                    data={formData.lastName}
                    method={handleChange} />

        <SideErrorMessage
            message={
                error && error.errors
                    ? error.errors.find(val => val.path === 'email')?.msg
                    : null
            }
        />          <InputBox label={"Email"} 
                    placeholder={"Enter your email"}
                    type={"email"}
                    id={"email"} 
                    name={'email'} 
                    data={formData.email} method={handleChange} />
        <SideErrorMessage
            message={
                error && error.errors
                    ? error.errors.find(val => val.path === 'password')?.msg
                    : null
            }
        />          <InputBox label={"Password"} 
                    placeholder={"Enter your password"}
                    type={"password"}
                    id={"password"} 
                    name={'password'} 
                    data={formData.password} method={handleChange} />

        <Button loading={loading} loadingValue ={"Creating user ..."} signUp={"Sign-up"}  /> 
       <Bottom message= {"Already have account ?"} name={"Sign-In"} link={'/sign-in'} />
        </form>
        
      </div>
    );
  };
  
export default SignUp;