import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "./globalStyles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./components/LandingPage";
import Car from "./components/Car";
import CarDetailsPage from "./components/CarsPage";
import ReservationsManagementPage from "./components/ReservationsManagementPage";
import CarsManagementPage from "./components/CarsManagementPage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerAccessPage from "./components/ManagerAccessPage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 60px; /* Height of the navbar */
  filter: ${(props) => (props.isMenuOpen ? "blur(8px)" : "none")};
  transition: filter 0.3s ease-in-out;

  @media (min-width: 768px) {
    filter: none;
  }
`;

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <ContentContainer isMenuOpen={isMenuOpen}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/our-cars" element={<CarDetailsPage />} />
            <Route path="/car/:id" element={<Car />} />
            <Route path="/manager-access" element={<ManagerAccessPage />} />
            <Route
              path="/reservations"
              element={
                <ProtectedRoute>
                  <ReservationsManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-cars"
              element={
                <ProtectedRoute>
                  <CarsManagementPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </ContentContainer>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </AppContainer>
    </Router>
  );
};

export default App;
