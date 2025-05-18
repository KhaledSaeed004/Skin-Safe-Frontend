import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DoctorProfile from "./pages/DoctorProfile";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Profile from "./pages/Profile";
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
            <Route path="/history" element={<History />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor">
              <Route path=":name" element={<DoctorProfile />} />
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
