import { useAuth } from "../features/auth/useAuth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "./ui/SpinnerLarge";
import { useEffect } from "react";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error("Please log in to continue.", {
        id: "auth-error",
        icon: "⚠️",
        position: "top-right",
        duration: 3000,
      });
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    // Show a loading state while authentication status is being determined
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-16 w-16 text-blue-500" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    const redirectURL = location.pathname + location.search;
    sessionStorage.setItem("redirectAfterLogin", redirectURL);

    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children components
  return <Outlet />;
}

export default ProtectedRoute;
