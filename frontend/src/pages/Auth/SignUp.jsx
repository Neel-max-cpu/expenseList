
import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../components/Inputs/Input";
import { validateEmail, validatePass } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  

  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();


  // signup Form Submit ---
  const handleSignUp = async (e) => {
    if(loading) return;

    setLoading(true);
    e.preventDefault();
    
    let profileImgUrl = "";

    if(!fullName){
      setError("Please enter your name!");
      setLoading(false);
      return;
    }

    if(!validateEmail(email)){
      setError("Please a valid email address!");
      setLoading(false);
      return;
    }

    if(!validatePass(password)){
      setError("Password must be atleast 6 Characters long!");
      setLoading(false);
      return;      
    }


    // todo -- password min of 6 len
    if(!password){
      setError("Please enter a valid password!");
      setLoading(false);
      return;
    }

    setError("");


    //signup api call
    try {

      // upload image if present --
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImgUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImgUrl,
      });

      const {token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        toast.success("Sign up success, redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");        
        }, 1500);
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please Try again!");
      }
    } finally{
      setLoading(false);
    }
  }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black ">Create An Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join Us Today By Entering Your Details:</p>


        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John Marston"
                type="text"
                />
            </div>
            
            <div className="w-full">
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="johnMarston@example.com"
                type="text"
                />
            </div>
            
            <div className="w-full md:col-span-2">
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

          <button 
            className={`btn-primary ${loading? "opacity-50 cursor-not-allowed" : ""}`}
            type="submit"
          >
            SiGN UP
          </button>

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