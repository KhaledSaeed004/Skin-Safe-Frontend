import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/ui/AuthLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

// Top-level pages
const DoctorProfile = lazy(() => import("./pages/DoctorProfile"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Scan = lazy(() => import("./pages/Scan"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Articles = lazy(() => import("./pages/Articles"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ConfirmSignup = lazy(() => import("./pages/ConfirmSignup"));
const Report = lazy(() => import("./pages/Report"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Article = lazy(() => import("./pages/Article"));

// Profile layout and its nested pages
const ProfileLayout = lazy(() => import("./pages/Profile/ProfileLayout"));
const ProfileInfo = lazy(() => import("./pages/Profile/ProfileInfo"));
const ProfileHistory = lazy(() => import("./pages/Profile/ProfileHistory"));
const ProfileAppointments = lazy(
  () => import("./pages/Profile/ProfileAppointments"),
);
const ProfileSettings = lazy(() => import("./pages/Profile/ProfileSettings"));

import ErrorBoundary from "./components/ErrorBoundary";
import PageSuspense from "./components/PageSuspense";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <Toaster position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageSuspense />}>
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
                  <Route
                    path="appointments"
                    element={<ProfileAppointments />}
                  />
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
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
