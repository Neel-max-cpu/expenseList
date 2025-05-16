/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link, useNavigate} from 'react-router-dom'
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  
  // signup Form Submit ---
  const handleSignUp = async(e)=>{
    
  }


  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold ">Create An Account</h3>
        <p className="">Join Us Today By Entering Your Details:</p>
      </div>
    </AuthLayout>
  )
}

export default SignUp