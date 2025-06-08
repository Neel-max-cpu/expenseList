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

