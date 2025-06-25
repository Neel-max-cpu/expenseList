import moment from 'moment';
import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';

const EditExpenseForm = ({initialValues, onEditExpense}) => {
    const [formData, setFormData] = useState({
        category:"",
        amount:"",
        date:"",
        icon:"",
    });

    useEffect(() => {
      if(initialValues){
        setFormData({
            ...initialValues,
            date: initialValues? moment(initialValues.date).format("YYYY-MM-DD"):""
        });
      }
    }, [initialValues])
    
    const handleSubmit = ()=>{
        onEditExpense(formData);
    }

    const handleChange = (key,value) => setFormData({...formData, [key]:value});
    
  return (
    <div>

        <EmojiPickerPopup
            icon={formData.icon}
            onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
        />

        <Input
            value={formData.category}
            onChange={({target})=>handleChange("category", target.value)}
            label="Expense Category"
            placeholder="Rent, Groceries, etc"
            type="text"
        />

        <Input
            value={formData.amount}
            onChange={({target})=>handleChange("amount", target.value)}
            label="Amount"
            placeholder=""
            type="number"
        />
       
        <Input
            value={formData.date}
            onChange={({target})=>handleChange("date", target.value)}
            label="Date"
            placeholder=""
            type="date"
        />
        
        <div className="flex justify-end mt-6">
            <button 
                type='button'   
                className="add-btn-fill"
                onClick={handleSubmit}
            >
                Edit Expense
            </button>
        </div>
    </div>
  )
}

export default EditExpenseForm