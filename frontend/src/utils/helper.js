import moment from "moment";

export const validateEmail = (email)=>{
    /*
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/; - meaning
    /^ start of the string
    [^\s@] = One or more characters that are not whitespace or @
    +@ = there should be @
    [^\s@] = One or more characters that are not whitespace or @ (domain name)
    +\. = should be a dot(.)
    [^\s@] = One or more characters that are not whitespace or @ (TLD like .com)
    $ = end of the string
    */
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const validatePass = (password) => password.length >= 6;

export const validateCpass = (confirmPassword, password) => password === confirmPassword;


export const getInitials = (name)=>{
    if(!name) return "";

    const words = name.split(" ");
    let initials = "";
    for(let i=0; i<Math.min(words.length, 2); i++){
        initials += words[i][0]
    }
    return initials.toUpperCase();
};

export const addThousandsSeparator = (num)=>{
    if(num == null || isNaN(num)) return "";
    
    const[integerPart, fractionalPart] = num.toString().split(".");
    /*
    //regex command to give , to number eg- 10000 = 10,000
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart ?
    `${formattedInteger}.${fractionalPart}` : formattedInteger;
    */

    const lastThree = integerPart.slice(-3);
    const otherDigits = integerPart.slice(0, -3);
    const formatted = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits ? "," : "") + lastThree;

    return fractionalPart ? `${formatted}.${fractionalPart}` : formatted;
};


export const prepareExpenseBarChartData = (data=[])=>{
    const chartData = data.map((item)=>({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
}

export const prepareIncomeBarChartData = (data=[])=>{
    const sortedData = [...data].sort((a,b)=>new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format("Do MMM YYYY"),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
}


export const prepareExpenseLineChartData = (data=[])=>{
    const sortedData = [...data].sort((a,b)=>new Date(a.date) - new Date(b.date));
    const chartData = sortedData.map((item)=>({
        month: moment(item?.date).format("Do MMM YYYY"),
        amount: item?.amount,
        category: item?.category,
    }))
    return chartData;
}


export const prepareMonthlySummary = (data = []) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const result = monthNames.map((monthName) => {
    const entry = data.find(item => item.month === monthName);

    const income = Number(entry?.income) || 0;
    const expense = Number(entry?.expense) || 0;

    return {
      month: monthName,
      income,
      expense,
      notransaction: income === 0 && expense === 0
    };
  });
//   console.table(result);

  return result;
};

