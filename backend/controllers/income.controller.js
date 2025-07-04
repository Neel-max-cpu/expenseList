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

export async function editIncome(req,res){
    const userId = req.user.id;
    try {
        const particularIncome = await Income.findById(req.params.id);
        if(!particularIncome){
            return res.status(400).json({message: "No Income found with that Id!"});
        }

        if(particularIncome.userId.toString() !== userId){
            return res.json(403).json({message: "Unauthorized!"});
        }

        const {icon, source, amount, date} = req.body;

        //update fields
        particularIncome.icon = icon || particularIncome.icon;
        particularIncome.source = source || particularIncome.source;
        particularIncome.amount = amount || particularIncome.amount;
        particularIncome.date = date || particularIncome.date;

        const updateIncome = await particularIncome.save();

        return res.status(200).json(updateIncome);

    } catch (error) {
        return res.status(500).json({message:"Internal server error!"});
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
        
        const wb = xlsx.utils.book_new();           //wb - workbook
        const ws = xlsx.utils.json_to_sheet(data);  // ws - worksheet
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (err) {
        res.status(500).json({message:"Server error!", error:err.message});   
    }
}
