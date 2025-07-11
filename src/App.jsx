import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DoctorProfile from "./pages/DoctorProfile";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import History from "./pages/History";
import Articles from "./pages/Articles";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AuthLayout from "./components/ui/AuthLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ConfirmSignup from "./pages/ConfirmSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import ProfileInfo from "./pages/Profile/ProfileInfo";
import ProfileHistory from "./pages/Profile/ProfileHistory";
import ProfileAppointments from "./pages/Profile/ProfileAppointments";
import ProfileSettings from "./pages/Profile/ProfileSettings";
import Article from "./pages/Article";
import Report from "./pages/Report";
import Doctors from "./pages/Doctors";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/scan" element={<Scan />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<ProfileLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<ProfileInfo />} />
              <Route path="reports" element={<ProfileHistory />} />
              <Route path="reports/:id" element={<Report />} />
              <Route path="appointments" element={<ProfileAppointments />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/confirm-signup" element={<ConfirmSignup />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
