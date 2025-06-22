import {createContext, useState} from 'react';

export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);    

    // function to update user data
    const updateUser = (userData)=>{
        setUser(userData);
        // console.log("📦 UserContext updated:", userData);
    };

    // function to clear user data (eg on logout)
    const clearUser = ()=>{
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user, 
                updateUser, 
                clearUser,                
            }}
        >
            {children}
        </UserContext.Provider>
    )
    
}


export default UserProvider;

/*
UserContext	- Just a container (the mailbox)--- this file
UserProvider - Holds user data and functions, puts them in the container
useContext() - Used by any component to access data from that container -- used in login/signup
*/