import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import EditExpenseForm from '@/components/Expense/EditExpenseForm';

const Expense = () => {
    useUserAuth();
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState({show:false, data:null});
    const [editFormData, setEditFormData] = useState(null);
    
    const [loading2, setLoading2] = useState(false);
    
    
    
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
    if(loading2) return;
    
    setLoading2(true);
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
    } finally{
      setLoading2(false);
    }
  };


  //edit expesense
  const handleEditExpense = async (udpdatedExpense)=>{
    if(loading2) return;

    setLoading2(true);
    const {_id, category, amount, date, icon} = udpdatedExpense;

    // validatino
    if(!category.trim()){
      toast.error("Category is required!");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be valid number greater than 0!");
      return;
    }

    if(!date){
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.EXPENSE.EDIT_EXPENSE(_id), {
        category, 
        amount, 
        date, 
        icon,
      });
      setOpenEditModal({show:false, data:null});
      toast.success("Expense Edited Successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error editing expense: ", error.response?.data.message || error.message);
      toast.error("Something went wrong please try again!");
    } finally{
      setLoading2(false);
    }
  };

  //delete expense
  const deleteExpense = async (id)=>{
    if(loading2) return;
    setLoading2(true);
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false, data:null});
      toast.success("Expense Deleted Successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting the expense!", error.response?.data?.message || error.message);
      toast.error("Something is wrong please try again!");
    } finally{
      setLoading2(false);
    }
  };
  
  //handle download expense details
  const handleDownloadExpenseDetails = async()=>{
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob",
        }
      );
      
      //create url
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense List Downloaded Successfully!");
    } catch (error) {
      console.error("Error downloading the expense!", error);
      toast.error("Something is wrong when donwloading, please try again!");
    }
  };
  
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
              transactions={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id)=>setOpenDeleteAlert({show:true, data:id})}
            onEdit = {(id)=>{
              const expenseToEdit = expenseData.find((item)=>item._id === id);
              setEditFormData(expenseToEdit);
              setOpenEditModal({show:true, data:id});
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=>setOpenAddExpenseModal(false)}
          title = "Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} loading={loading2} />
        </Modal>

        <Modal
          isOpen={openEditModal.show}
          onClose={()=>{
            setOpenEditModal({show:false, data:null});
            setEditFormData(null);
          }}
          title="Edit Expense"
        >
          <EditExpenseForm
            initialValues={editFormData}
            onEditExpense={handleEditExpense}
            loading={loading2}
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense detail?"
            onDelete={()=>deleteExpense(openDeleteAlert.data)}
            loading={loading2}
          />
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Expense