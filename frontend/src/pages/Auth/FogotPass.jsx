import Input from '@/components/Inputs/Input';
import AuthLayout from '@/components/layouts/AuthLayout';
import { UserContext } from '@/context/userContext';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { validateCpass, validateEmail, validatePass } from '@/utils/helper';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom'

const FogotPass = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);    
    
    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleForgetPassword = async(e)=>{
      e.preventDefault();

      if(!validateEmail(email)){
        setError("Please enter a valid Email!")
        return;
      }

      if(!validatePass(password)){
        setError("Password must be alteast 6 Characters long!");
        return;
      }

      if(!validateCpass(confirmPassword, password)){
        setError("Password and Confirm password are not same!");
        return;
      }

      setError("");

      try {
        const response = await axiosInstance.put(API_PATHS.AUTH.FORGOT_PASS, {
          email, 
          password, 
          confirmPassword,
        });

        toast.success("Password Upadate Successfully! Redirecting to Login...");

        setTimeout(()=>{
          navigate("/login");
        }, 2000);
        
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
          Please enter your details to Update the Password
        </p>

        <form onSubmit={handleForgetPassword} >
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
            placeholder="Enter Your New Password"
            type="password"
          />
          <Input
            value={confirmPassword}
            onChange={({target})=> setConfirmPassword(target.value)}
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }

          <button className="btn-primary" type="submit">Update</button>

          <div className="flex gap-3">
            <p className="text-[13px] text-slate-400 mt-3">
              Don't have an account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
            <p className="text-[13px] text-slate-400 mt-3">
              Already have an account?{" "}
              <Link className="font-medium text-blue-500 underline" to="/login">
                LogIn
              </Link>
            </p>
          </div>

        </form>
      </div>
    </AuthLayout>
  )
}

export default FogotPass