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
import AuthLayout from "./components/ui/AuthLayout";
import Passwordconfirmation from "./pages/Passwordconfirmation";
import Passwordreset from  "./pages/Passwordreset"
import Report from  "./pages/Report"
import Article from "./pages/Article";
import MyAppointments from "./pages/MyAppointments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/scan" element={<Scan />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/history" element={<History />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<Report />} />
          <Route path="/article" element={<Article />} />
          <Route path="/MyAppointments" element={<MyAppointments />} />
          <Route path="/doctor">
            <Route path=":name" element={<DoctorProfile />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login/password-confirmation" element={<Passwordconfirmation />}   />
          <Route path="/login/password-reset" element={<Passwordreset />} />

          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="login/passwordreset" element={<ForgotPassword />} /> */}
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
