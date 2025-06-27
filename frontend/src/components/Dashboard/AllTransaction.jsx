import React, { useEffect, useState } from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { prepareMonthlySummary } from '../../utils/helper';
import CustomAllTransactionChart from '../Charts/CustomAllTransactionChart';


const AllTransaction = ({montlySummary, onSeeIncome, onSeeExpense}) => {
    
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      if(montlySummary){
        const result = prepareMonthlySummary(montlySummary);
        // console.log("📊 Chart Data:", result);
        // console.log("monthly summary", montlySummary);
        setChartData(result);
      }
    
      return () => {}
    }, [montlySummary])
    
    
  return (
    <div className='card-alltrans'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg font-semibold'>All Transaction</h5>
            <div className="flex space-x-2">
                <button className="card-btn" onClick={onSeeIncome}>
                    View Income <LuArrowRight className='text-base'/>
                </button>
                <button className="card-btn" onClick={onSeeExpense}>
                    View Expense <LuArrowRight className='text-base'/>
                </button>
            </div>
        </div>
        
        <div className='mt-10'>
          <CustomAllTransactionChart data={chartData} />               
        </div>
        
    </div>
  )
}

export default AllTransaction