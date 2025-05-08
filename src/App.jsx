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
import ForgotPassword from "./pages/Passwordreset";
import AuthLayout from "./components/ui/AuthLayout";
import Passwordconfirmation from "./pages/Passwordconfirmation";

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
          <Route path="/doctor">
            <Route path=":name" element={<DoctorProfile />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/passwordconfirmation" element={<Passwordconfirmation/>} />

          {/* <Route path="login/passwordreset" element={<ForgotPassword />} /> */}
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
