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

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
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
    const {source, amount, date, icon} = income;

    //validation check
    if(!source.trim()){
      toast.error("Source is required!");
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
      toast.error("Something is wrong please try again!");
    }
  };


  //delete income
  const deleteIncome = async (id)=>{
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false, data:null});
      toast.success("Income Deleted Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting the income!", error.response?.data?.message || error.message);
      toast.error("Something is wrong please try again!");
    }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async()=>{};
  
  useEffect(() => {
    fetchIncomeDetails()
    return () => {}    
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
            onDownload={handleDownloadIncomeDetails}
          />



        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>


        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=>setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
          />
        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income