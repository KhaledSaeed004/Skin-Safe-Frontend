import { useState } from "react";
import History from "./History"; // Import the History component
import Button from "../components/ui/Button";

// Simple icon components
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HistoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8v4l3 3"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile data
  const profileData = {
    name: "Muhammed Ali",
    phone: "(201) 1022 333 44",
    skinTone: "light to medium",
    date: "14-Mar-2025",
    email: "muhammed.ali@example.com",
    memberSince: "January 2025",
  };

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-blue-50 p-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <UserIcon />
                </div>
                <h3 className="text-lg font-semibold text-blue-800">
                  My Account
                </h3>
              </div>
            </div>

            <nav className="p-2">
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "profile"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <UserIcon />
                    <span>My Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "history"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <HistoryIcon />
                    <span>My History</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "appointments"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <CalendarIcon />
                    <span>My Appointments</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("reports")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "reports"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FileTextIcon />
                    <span>My Reports</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "settings"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <SettingsIcon />
                    <span>My Settings</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("notifications")}
                    className={`flex w-full items-center space-x-3 rounded-md p-3 transition-colors ${
                      activeTab === "notifications"
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <BellIcon />
                    <span>My Notifications</span>
                  </button>
                </li>
                <li className="mt-2 border-t pt-2">
                  <button className="flex w-full items-center space-x-3 rounded-md p-3 text-red-600 transition-colors hover:bg-red-50">
                    <LogOutIcon />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-9">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {activeTab === "profile" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                  My Profile
                </h2>

                <div className="flex flex-col gap-8 md:flex-row">
                  {/* Profile Image */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-blue-100 bg-gray-200">
                        <img
                          src="./public/doctor-full-body.png"
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button className="bg-primary absolute right-0 bottom-0 rounded-full p-2 text-white transition-colors">
                        <CameraIcon />
                      </button>
                    </div>
                    <Button variant="primary">Edit Profile</Button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="rounded-lg bg-blue-50 p-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Name
                            </span>
                            <span className="text-lg font-medium">
                              {profileData.name}
                            </span>
                          </p>

                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Phone
                            </span>
                            <span className="font-medium">
                              {profileData.phone}
                            </span>
                          </p>

                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Email
                            </span>
                            <span className="font-medium">
                              {profileData.email}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Skin tone
                            </span>
                            <span className="font-medium">
                              {profileData.skinTone}
                            </span>
                          </p>

                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Member since
                            </span>
                            <span className="font-medium">
                              {profileData.memberSince}
                            </span>
                          </p>

                          <p className="mb-4">
                            <span className="block text-sm text-gray-500">
                              Last updated
                            </span>
                            <span className="font-medium">
                              {profileData.date}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-medium">
                        Skin Analysis History
                      </h3>
                      <History />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My History</h2>
                <p className="text-gray-600">
                  Your skin analysis history will appear here.
                </p>
              </div>
            )}

            {activeTab === "appointments" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My Appointments</h2>
                <p className="text-gray-600">
                  Your upcoming and past appointments will appear here.
                </p>
              </div>
            )}

            {activeTab === "reports" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My Reports</h2>
                <p className="text-gray-600">
                  Your skin analysis reports will appear here.
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My Settings</h2>
                <p className="text-gray-600">
                  Account settings and preferences will appear here.
                </p>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="mb-4 text-xl font-semibold">My Notifications</h2>
                <p className="text-gray-600">
                  Your notification preferences will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
