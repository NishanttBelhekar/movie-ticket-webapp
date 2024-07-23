import React from "react";
import { useUser } from "../contexts/UserContext"; // Adjust import as per your project structure

const Settings = () => {
  const { user, loading } = useUser(); // Retrieve user context

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile Settings
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Edit your profile information below.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {user ? user.displayName : "No user data"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {user ? user.email : "No user data"}
                </dd>
              </div>
              {/* Add more fields as needed */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
