import React from 'react';
import { useState } from 'react';
import { Bottom } from './shared/Bottom';
import { Button } from './shared/Button';
import { Heading } from './shared/Heading';
import { InputBox } from './shared/InputBox';


const SignIn = () => {
    const [formData,setFromData] = useState({
        email:'',
        password:''
    })
    const handleChange =(e)=>{
        setFromData({...formData,[e.target.name]: e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const userData = formData;
        console.log(userData);

    }

    const loading = false;
  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
    <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
    onSubmit={handleSubmit}
    >
      <Heading label={"Sign-In"}/>
      <InputBox label={"Email"} 
                placeholder={"Enter your email"}
                type={"email"}
                id={"email"} 
                name={'email'} 
                data={formData.email} 
                method={handleChange} />
      <InputBox label={"Password"} 
                placeholder={"Enter your password"}
                type={"password"}
                id={"password"} 
                name={'password'} 
                data={formData.password} 
                method={handleChange} />
      
    <Button loading={loading} loadingValue ={"Creating user ..."} signUp={"Sign-In"}  /> 
   <Bottom message= {"I don't have account "} name={"Sign-Up"} link={'/sign-up'} />
    </form>
    
  </div>
  );
};

export default SignIn;