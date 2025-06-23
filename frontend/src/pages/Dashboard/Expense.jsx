import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    });


  //get all expense details
  const fetchExpenseDetails = async ()=>{
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong please try again later!", error)
    } finally{
      setLoading(false);
    }
  };

  //handle add expense
  const handleAddExpense = async (expense)=>{
    const {category, amount, date, icon} = expense;

    //validation check
    if(!category.trim()){
      toast.error("Category is required!");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be valid number greater than 0!");
      return;
    }

    if(!date){
      toast.error("Date is required!");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {        
        icon,
        category,
        amount, 
        date,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense Added Successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error adding expense: ", error.response?.data.message || error.message);
      toast.error("Something is wrong please try again!");
    }
  };


  //delete income
  const deleteExpense = async (id)=>{
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false, data:null});
      toast.success("Expense Deleted Successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting the expense!", error.response?.data?.message || error.message);
      toast.error("Something is wrong please try again!");
    }
  };

  //handle download income details
  const handleDownloadExpenseDetails = async()=>{};
  
  useEffect(() => {
    fetchExpenseDetails()
    return () => {}    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transaction={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense