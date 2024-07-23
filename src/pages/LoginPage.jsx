import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import SignIn from "../components/SignIn";
import Signup from "../components/Signup";

const auth = getAuth(app);

const LoginPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
 
    return <p>You are already logged in.</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 overflow-scroll w-full">
      <div className="max-w-screen-xl w-full flex justify-center">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Sign in
            </h2>
            <SignIn />
          </div>
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
              Sign up
            </h2>
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
