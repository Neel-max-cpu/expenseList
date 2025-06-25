import express from 'express';
import {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel, editIncome} from '../controllers/income.controller.js';
import protect from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/add", protect, addIncome);
router.put("/edit/:id", protect, editIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadIncomeExcel", protect, downloadIncomeExcel);

export default router;