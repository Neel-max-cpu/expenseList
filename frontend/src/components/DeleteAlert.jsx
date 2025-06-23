import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
        <p className="text-sm">{content}</p>

        <div className="flex justify-end mt-6">
            <button className="add-btn-fill !bg-red-600 hover:!bg-red-700" onClick={onDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert