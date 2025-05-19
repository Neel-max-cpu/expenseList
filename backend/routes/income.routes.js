import express from 'express';
import {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} from '../controllers/income.controller.js';
import protect from '../middleware/auth.middleware.js'

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadIncomeExcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

export default router;