import xlsx from 'xlsx';
import Income from '../models/Income.models.js'; 

// const userId = req.user.id;          // since jwt we are using _id to sign so we can pick up sign

// add income source
export async function addIncome(req, res) {
    const userId = req.user.id;
    try {
        const {icon, source, amount, date} = req.body;

        // validation check for missing fields
        if(!source || !amount || !date){            
            return res.status(400).json({message:"All Fields must be filled!"});
        }
        
        const newIncome = new Income({
            userId,
            icon,
            source, 
            amount,
            date:new Date(date),
        });
        
        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (err) {
        res.status(500).json({message:"Server error!"});
    }
}

// get all income source
export async function getAllIncome(req, res) {
    const userId = req.user.id;

    try {
        // find all the income of that particular user - userId
        const income = await Income.find({userId}).sort({date:-1});
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json({message:"Server error!", error:err.message});
    }
}

// delete income source
export async function deleteIncome(req, res) {
    const userId = req.user.id; 
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully!"});
    } catch (err) {
        res.status(500).json({message:"Server error!", error:err.message});
    }
}

// download excel
export async function downloadIncomeExcel(req, res) {
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).sort({date:-1});

        // prepare data for excel
        const data = income.map((item)=>({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (err) {
        res.status(500).json({message:"Server error!", error:err.message});   
    }
}