import React from 'react'

const DeleteAlert = ({content, onDelete, loading}) => {
  return (
    <div>
        <p className="text-sm">{content}</p>

        <div className="flex justify-end mt-6">
            <button 
              className={`add-btn-fill !bg-red-600 hover:!bg-red-700 ${loading?"opacity-50 cursor-not-allowed" :""}`} 
              onClick={onDelete}              
              disabled={loading}
            >
                {loading? "Deleting..." : "Delete"}
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert