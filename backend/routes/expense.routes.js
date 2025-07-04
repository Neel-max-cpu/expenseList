import express from 'express';
import {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel, editExpense} from '../controllers/expense.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/add", protect, addExpense);
router.put("/edit/:id",protect, editExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/downloadExpenseExcel", protect, downloadExpenseExcel);

export default router;