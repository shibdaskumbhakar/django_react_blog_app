import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { isLoggedIn } from "./utils";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./components/ForgotPassword";


const ProtectedRoute = ({ children }) => {
  const auth = isLoggedIn();
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Routers = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        
        <Route
          path="/post-details/:slug"
          element={
            <PostDetails />
          }
          exact
        />

        <Route path="/dashbaord" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          exact
        />

        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/forgot-password" element={<ForgotPassword />} exact />

        <Route path="*" element={<Navigate to="/not-found" replace />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default Routers;
