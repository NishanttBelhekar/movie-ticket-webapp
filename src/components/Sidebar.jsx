import React, { createContext, useContext, useState } from "react";
import { CgMoreVertical, CgProfile } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import icon2 from "../images/Icon2.png";
import { UserContext } from "../contexts/UserContext"; // Import UserContext

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user } = useContext(UserContext); // Access user data from UserContext

  const handleToggleExpand = () => {
    setExpanded((curr) => !curr);
  };

  return (
    <aside className="h-screen top-0 left-0 bg-white border-r shadow-sm">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={icon2}
            className={`overflow-hidden transition-all ${
              expanded ? "w-12" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={handleToggleExpand}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <IoChevronBackOutline /> : <FaAngleRight />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          
          <CgProfile size={24}/>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div>
              <h4 className="font-semibold">
                {user ? user.displayName : "Guest"}
              </h4>
              <span className="text-xs text-gray-600">
                {user ? user.email : "guest@example.com"}
              </span>
            </div>
            <CgMoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
    ${
      expanded
        ? "hover:bg-indigo-50 text-gray-600"
        : "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
    }`}
    >
      <Link to={to} className="flex items-center">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}
