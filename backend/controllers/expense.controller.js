import xlsx from 'xlsx';
import Expense from '../models/Expense.models.js';


// add expense category
export async function addExpense(req, res) {
    const userId = req.user.id;    
    try {
        const {icon, category, amount, date} = req.body;

        // validation check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"All Fields must be filled!"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category, 
            amount,
            date:new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
        
    } catch (err) {
        res.status(500).json({message:"Server error!"});
    }
}

// edit expense
export async function editExpense(req, res){
    const userId = req.user.id;
    try {
        const particularExpense = await Expense.findById(req.params.id);
        if(!particularExpense){
            return res.status(400).json({message:"No Expense found with that Id!"});            
        }

        if(particularExpense.userId.toString() !== userId){
            return res.status(403).json({message:"Unauthorized!"});
        }

        const {icon, category, amount, date} = req.body;

        //update fields
        particularExpense.icon = icon || particularExpense.icon;
        particularExpense.category = category || particularExpense.category;
        particularExpense.amount = amount || particularExpense.amount;
        particularExpense.date = date || particularExpense.date;

        const updateExpense = await particularExpense.save();

        return res.status(200).json(updateExpense);
    } catch (error) {
        return res.status(500).json({message:"Internal server Error!"});
    }
}

// get all expense category
export async function getAllExpense(req, res) {
    const userId = req.user.id;
    try {
        // find all the expense of that particular user - userId
        const expense = await Expense.find({userId}).sort({date:-1});
        res.status(200).json(expense);
    } catch (err) {
        res.status(500).json({message:"Server error!"});
    }
}

// delete expense category
export async function deleteExpense(req, res) {
    const userId = req.user.id;
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense delete successfully!"});
    } catch (err) {
        res.status(500).json({message:"Server error!"});
    }
}

// download excel
export async function downloadExpenseExcel(req, res) {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).sort({date:-1});

        // prepare data for excel
        const data = expense.map((item)=>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (err) {
        res.status(500).json({message:"Server error!"});
    }
}