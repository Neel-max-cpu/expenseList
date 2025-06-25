// export const BASE_URL = "http://localhost:5001";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser",
        FORGOT_PASS:"/api/v1/auth/forgetpass",
    },
    DASHBOARD:{
        GET_DATA:"/api/v1/dashboard/",
        GET_MONTHLY_SUMMARY:"/api/v1/dashboard/monthly-summary",
    },
    INCOME:{
        ADD_INCOME:"/api/v1/income/add",
        EDIT_INCOME: (incomeId)=> `/api/v1/income/edit/${incomeId}`,
        GET_ALL_INCOME:"/api/v1/income/get",
        DELETE_INCOME: (incomeId)=> `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME:`/api/v1/income/downloadIncomeExcel`,
    },
    EXPENSE:{
        ADD_EXPENSE:"/api/v1/expense/add",
        EDIT_EXPENSE: (expenseId)=>`/api/v1/expense/edit/${expenseId}`,
        GET_ALL_EXPENSE:"/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId)=> `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE:`/api/v1/expense/downloadExpenseExcel`,
    },
    IMAGE:{
        UPLOAD_IMAGE:"/api/v1/auth/upload-image",
    },
};