import React , {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransaction from '../../components/Dashboard/RecentTransaction';
import { addThousandsSeparator } from '../../utils/helper';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import WorkingPieChart from '../../components/Charts/WorkingPieChart';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import AllTransaction from '../../components/Dashboard/AllTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithCharts from '../../components/Dashboard/RecentIncomeWithCharts';
import RecentIncome from '../../components/Dashboard/RecentIncome';


// icons
import {LuHandCoins, LuWalletMinimal} from 'react-icons/lu';
import {IoMdCard} from 'react-icons/io'

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [montlySummary, setMontlySummary] = useState(null);
  
  const [loading, setLoading] = useState(false);
  
  const fetchDashboardData = async ()=>{
    //data is loading already don't hit api
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data){
        console.log("✅ Dashboard data fetched:", response.data);
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally{
      setLoading(false);
    }
  };

  const fetchMontlySummary = async()=>{
    if(loading) return;

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_MONTHLY_SUMMARY}`);

      if(response.data){
        console.log("✅ Dashboard montly summary:", response.data);
        setMontlySummary(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally{
      setLoading(false);
    }
  }

  

  useEffect(() => {
    fetchDashboardData();
    fetchMontlySummary();
    return ()=>{}
  },[]);
  
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance Life Time"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0 )}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal/>}
            label="Total Income Life Time"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0 )}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins/>}
            label="Total Expense Life Time"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0 )}
            color="bg-red-500"
          />
        </div>

        {/* bar chart of income and expnese */}
        <div className="flex flex-col mt-5">
          <AllTransaction
            montlySummary={montlySummary || []}    
            onSeeIncome={()=>navigate("/income")}        
            onSeeExpense={()=>navigate("/expense")}        
          />
        </div>

        {/* recent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          <RecentTransaction
            transactions={dashboardData?.recentTransaction}
            onSeeMore={()=>navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          {/* test */}
          {/* <WorkingPieChart/> */}

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpense?.transactions || []}
            onSeeMore={()=>navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
          />


          <RecentIncomeWithCharts
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={()=>navigate("/income")}
          />

        </div>
      
      </div>
    </DashboardLayout>
  )
}

export default Home