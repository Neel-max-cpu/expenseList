/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();


  // signup Form Submit ---
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name!");
      return;
    }

    if(!validateEmail(email)){
      setError("Please a valid email address!");
      return;
    }


    // todo -- password min of 6 len
    if(!password){
      setError("Please enter a valid password!");
      return;
    }

    setError("");


    //signup api call
  }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold ">Create An Account</h3>
        <p className="text-xs text-slate-400 mt-[5px] mb-6">Join Us Today By Entering Your Details:</p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Marston"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="johnMarston@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 6 Characters"
                type="password"
              />
            </div>



          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button className="btn-primary" type="submit">SiGN UP</button>

          <p className="text-[13px] text-slate-400 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-blue-500 underline" to="/login">
              LogIn
            </Link>
          </p>

        </form>

      </div>

    </AuthLayout>
  )
}

export default SignUp