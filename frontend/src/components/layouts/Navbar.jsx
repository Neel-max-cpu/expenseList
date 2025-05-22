import React, { useState } from 'react'
import SideMenu from './SideMenu';

// icons --
import { HiOutlineMenu, HiOutlineX  } from "react-icons/hi";

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    
  return (
    <div className="flex gap-5 bg-[#101212] border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button 
            className="hover:cursor-pointer block lg:hidden"
            onClick={()=>{
                setOpenSideMenu(!openSideMenu);
            }}
        >
            {openSideMenu ? (
                <HiOutlineX className='text-2xl'/>
            ) : (
                <HiOutlineMenu className='text-2xl'/>
            )}
        </button>

        <h2 className="text-lg font-medium">Expense Tracker</h2>
            
        {openSideMenu && (
            <div className="fixed top-[61px] -ml-4">
                <SideMenu activeMenu={activeMenu}/>
            </div>
        )}
    </div>
  )
}

export default Navbar