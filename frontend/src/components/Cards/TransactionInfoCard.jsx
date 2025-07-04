import { addThousandsSeparator } from '@/utils/helper';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';

//icons
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from 'react-icons/lu';
// import { LuUtensils } from "react-icons/lu";


const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, hideEditBtn, onDelete, onEdit }) => {

  const getAmountStyles = ()=>{
    return type === 'income' ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
  }

  let amt = addThousandsSeparator(amount)


  return (
    <div className='group hover:translate-x-[3px] transition duration-300 relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
      
      {/* icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className='w-6 h-6' />
        ) : (
          <LuUtensils />
        )}
      </div>
      
      {/* title and date */}
      <div className="flex-1 flex items-center justify-between">
        <div className="">
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {!hideEditBtn && (
            <button className="text-gray-400 hover:-translate-y-[3px] duration-300 hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onEdit}>
              <FaRegEdit  size={18}/>
            </button>
          )}

          {!hideDeleteBtn && (
            <button className="text-gray-400 hover:-translate-y-[3px] duration-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={onDelete}>
              <LuTrash2 size={18}/>
            </button>
          )}
          

          {/* amount */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className='text-xs font-medium'>
              {type === "income" ? "+" : "-"} Rs. {amt}
            </h6>
            {type === "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
          </div>          
        </div>

      </div>


    </div>
  )
}

export default TransactionInfoCard