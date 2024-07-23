import React, { useState, useEffect, useContext } from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { MdLocalMovies, MdSettings } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { UserContext } from "../contexts/UserContext"; 

const Dashboard = () => {
  const { user } = useContext(UserContext); 
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    // Hardcoded admin check based on user email
    const adminEmail = "admin@example.com";

    if (user && user.email === adminEmail) {
      setIsAdmin(true); 
    } else {
      setIsAdmin(false); 
    }
  }, [user]); 

  return (
    <div className="h-screen flex">
      <Sidebar>
        <SidebarItem
          icon={<MdLocalMovies size={20} />}
          text="Movies"
          to="/movies"
          alert
        />
        {isAdmin && (
          <SidebarItem
            icon={<MdAccountCircle size={20} />}
            text="Admin"
            to="/admin"
          />
        )}
        <SidebarItem
          icon={<MdSettings size={20} />}
          text="Settings"
          to="/settings"
          alert
        />
      </Sidebar>
    </div>
  );
};

export default Dashboard;
