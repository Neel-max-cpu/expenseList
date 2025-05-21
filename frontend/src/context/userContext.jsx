import {createContext} from 'react';

export const UserContext = createContext();

/*
UserContext	- Just a container (the mailbox)--- this file
UserProvider - Holds user data and functions, puts them in the container
useContext() - Used by any component to access data from that container -- used in login/signup
*/