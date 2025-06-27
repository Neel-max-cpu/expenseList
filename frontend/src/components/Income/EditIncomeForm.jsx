import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';
import moment from 'moment';

const EditIncomeForm = ({onEditIncome, initialValues, loading }) => {
    const [formData, setFormData] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });

    useEffect(() => {
      if(initialValues){
        setFormData({
            ...initialValues,
            date: initialValues.date? moment(initialValues.date).format("YYYY-MM-DD") : "",
        });
      }
    }, [initialValues])
    
    const handleSubmit = ()=>{
        onEditIncome(formData);
    }


    const handleChange = (key,value) => setFormData({...formData, [key]:value});

  return (
    <div>

        <EmojiPickerPopup
            icon={formData.icon}
            onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
        />

        <Input
            value={formData.source}
            onChange={({target})=>handleChange("source", target.value)}
            label="Income Source"
            placeholder="Freelance, Salary, etc"
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
                className={`add-btn-fill ${loading?"opacity-50 cursor-not-allowed" :""}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading? "Saving...":"Edit Income"}
            </button>
        </div>
    </div>
  )
}

export default EditIncomeForm