import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase"; // Adjust path as per your project structure
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

const useUser = () => {
  const { user, setUser, movie, setMovie, loading } = useContext(UserContext);
  return { user, setUser, movie, setMovie, loading };
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [movie, setMovie] = useState(null); // State for storing movie data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, movie, setMovie, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, useUser };
