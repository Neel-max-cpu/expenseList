import express from 'express';
import protect from '../middleware/auth.middleware.js';
import {getDashboardData, getMonthlySummary} from '../controllers/dashboard.controller.js'

const router = express.Router();
router.get("/", protect, getDashboardData);
router.get("/monthly-summary", protect, getMonthlySummary)

export default router;