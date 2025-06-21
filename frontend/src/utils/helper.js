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
    //regex command to give , to number eg- 10000 = 10,000
    const formattedInteger = integerPart.replace(/\B(?=(\d{3}) +(?!\d))/g, ",");

    return fractionalPart ?
    `${formattedInteger}.${fractionalPart}` : formattedInteger;
};


export const prepareExpenseBarChartData = (data=[])=>{
    const chartData = data.map((item)=>({
        category: item?.category,
        amount: item?.amount,
    }));

    return chartData;
}