import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import defaultPic from '../../assets/images/profilePic.png'
import CharAvatar from "../Cards/CharAvatar.jsx";
import ProfilePhotoSelector from "../Inputs/ProfilePhotoSelector.jsx";
import uploadImage from "@/utils/uploadImage.js";
import axiosInstance from "@/utils/axiosInstance.js";
import { API_PATHS } from "@/utils/apiPaths.js";
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUser  } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handlePicEdit = async (file)=>{
    if(loading || !file) return;
    setLoading(true);
  
    try {
      const imgUploadRes = await uploadImage(file);
      const profileImgUrl = imgUploadRes.imageUrl || "";
      
      const response = await axiosInstance.put(API_PATHS.IMAGE.EDIT_IMAGE,{
        profileImgUrl,
      })
      
      updateUser({ ...user, profileImgUrl });
      toast.success("Profile pic updated successfully!");
    } catch (error) {
      console.error("Error uploding the pic!", error);
      setLoading(false);
      toast.error("Something is wrong when donwloading, please try again!");
    } finally{
      setLoading(false);
    }
  }


  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white shadow-lg border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center relative justify-center gap-3 mt-3 mb-7">
        {profilePic ? (
          <img
            src={URL.createObjectURL(profilePic)}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : user?.profileImgUrl ? (
          <img
            src={user?.profileImgUrl || defaultPic}
            // src={defaultPic}            
            alt="Profile Image"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            heigh="h-20"
            style="text-2xl"
          />
        )}
         <div className="absolute bottom-7 right-16">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
            buttonOnly={true}
            onImageSelect={handlePicEdit}
          />
        </div>

        <h5 className="text-gray-950 font-medium leading-6">{user?.fullName || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] hover:cursor-pointer hover:bg-purple-100 ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 text-black font-medium hover:translate-x-[3px] transition duration-300`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
