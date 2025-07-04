import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import { useUserAuth } from '../../hooks/useUserAuth';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import EditIncomeForm from '@/components/Income/EditIncomeForm';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({show: false, data:null});
  const [editFormData, setEditFormData] = useState(null);

  const [loading2, setLoading2] = useState(false);
  
  
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });
  

  //get all income details
  const fetchIncomeDetails = async ()=>{
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong please try again later!", error)
    } finally{
      setLoading(false);
    }
  };


  //handle add income
  const handleAddIncome = async (income)=>{
    if(loading2) return;
    setLoading2(true);
    const {source, amount, date, icon} = income;

    //validation check
    if(!source.trim()){
      toast.error("Source is required!");
      setLoading2(false);
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be valid number greater than 0!");
      setLoading2(false);
      return;
    }

    if(!date){
      toast.error("Date is required!");
      setLoading2(false);
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount, 
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income Added Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error adding income: ", error.response?.data.message || error.message);
      setLoading2(false);
      toast.error("Something is wrong please try again!");
    } finally{
      setLoading2(false);
    }
  };


  //edit income
  const handleEditIncome = async (updatedIncome)=>{
    if(loading2) return;
    setLoading2(true);
    const {_id, source, amount, date, icon} = updatedIncome;

    // validation
    if(!source.trim()){
      toast.error("Source is Required!");
      setLoading2(false);
      return;
    }

    if(!amount || isNaN(amount) || Number(amount)<=0){
      toast.error("Amount should be valid number greater than 0!");
      setLoading2(false);
      return;
    }

    if(!date){
      toast.error("Date is required!");
      setLoading2(false);
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.INCOME.EDIT_INCOME(_id), {
        source,
        amount, 
        date, 
        icon,
      });
      setOpenEditModal({show:false, data:null});
      toast.success("Income Edited Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error editing income: ", error.response?.data.message || error.message);
      setLoading2(false);
      toast.error("Something is wrong please try again!");
    } finally{
      setLoading2(false);
    }
  };


  //delete income
  const deleteIncome = async (id)=>{
    if(loading2) return;
    setLoading2(true);
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false, data:null});
      toast.success("Income Deleted Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting the income!", error.response?.data?.message || error.message);
      setLoading2(false);
      toast.error("Something is wrong please try again!");
    } finally{
      setLoading2(false);
    }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async()=>{
    if(loading2) return;
    setLoading2(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType:"blob",
        }
      );
      
      //create url
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Income List Downloaded Successfully!");
    } catch (error) {
      console.error("Error downloading the income!", error);
      setLoading2(false);
      toast.error("Something is wrong when donwloading, please try again!");
    } finally{
      setLoading2(false);
    }
  };
  
  useEffect(() => {
    fetchIncomeDetails()
    return () => {}    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=>setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show: true, data:id});
            }}
            onEdit = {(id)=>{
              const incomeToEdit = incomeData.find((item)=>item._id === id);
              setEditFormData(incomeToEdit);
              setOpenEditModal({show: true, data:id});
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} loading={loading2} />
        </Modal>

        <Modal
          isOpen={openEditModal.show}
          onClose={()=>{
            setOpenEditModal({show:false, data:null});
            setEditFormData(null);
          }}
          title="Edit Income"
        >
          <EditIncomeForm 
            initialValues={editFormData}
            onEditIncome={handleEditIncome}  
            loading={loading2}          
          />
        </Modal>


        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
            loading={loading2}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income