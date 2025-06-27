import React, { useRef, useState } from 'react'

import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";

const ProfilePhotoSelector = ({image, setImage, buttonOnly = false, onImageSelect}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if(file){
            // update the img
            setImage(file);

            // generate the preview of the image
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
            onImageSelect && onImageSelect(file); 
            
        }
    };
    
    const handleRemoveImage = () =>{
        setImage(null);
        setPreviewUrl(null);        
    }

    const onChooseFile = ()=>{
        inputRef.current.click();
    };

    if (buttonOnly) {
        return (
            <>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={onChooseFile}
                className="w-8 h-8 bg-primary hover:cursor-pointer text-white rounded-full flex items-center justify-center !hover:bg-red-700"
            >
                <MdOutlineEdit />
            </button>
            </>
        );
    }


    return (
        <div className='flex justify-center mb-6'>
            <input 
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
             />
            
            {
                !image ? (
                    <div className=" w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
                        <LuUser className='text-4xl text-blue-400'/>
                        <button 
                            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 hover:cursor-pointer" 
                            type='button' 
                            onClick={onChooseFile}
                        >
                            <LuUpload className='' />                            
                        </button>
                        <button className=""></button>
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={previewUrl}
                            alt='profile photo'
                            className='w-20 h-20 rounded-full object-cover'
                         />
                        <button 
                            type='button' 
                            onClick={handleRemoveImage} 
                            className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full absolute -bottom-1 -right-1 hover:cursor-pointer"
                        >
                            <LuTrash2 className=''/>
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default ProfilePhotoSelector