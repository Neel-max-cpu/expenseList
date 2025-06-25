/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link, useNavigate} from 'react-router-dom'
import Input from "../../components/Inputs/Input";
import { validateEmail, validatePass } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const {updateUser} = useContext(UserContext);


  const navigate = useNavigate() ;
  
  // handle login function
  const handleLogin = async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please a valid Email!");
      return;
    }

    if(!validatePass(password)){
      setError("Password must be atleast 6 Characters long!");
      return;      
    }


    if(!password){
      setError("Please enter the password!");
      return;
    }

    setError("");


    // login api call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token, user} = response.data; 
      if(token){
        updateUser(user)
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something went wrong. Please try again!");
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} >
          <Input
            value={email}
            onChange={({target})=> setEmail(target.value)}
            label="Email Address"
            placeholder="Enter Your Email"
            type="text"
          />
          <Input
            value={password}
            onChange={({target})=> setPassword(target.value)}
            label="Password"
            placeholder="Enter Your Password"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }

          <button className="btn-primary" type="submit">LOGIN</button>

          <div className="flex gap-3">
            <p className="text-[13px] text-slate-400 mt-3">
              Don't have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
            <p className="text-[13px] text-slate-400 mt-3">
              Forgot your password?{" "}
              <Link className="font-medium text-primary underline" to="/forgot">
                Change Password
              </Link>
            </p>
          </div>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
