import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Container from "./ui/Container";
import AppointmentBookingPopup from "./AppointmentBookingPopup";

function DoctorsLayout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default DoctorsLayout;
