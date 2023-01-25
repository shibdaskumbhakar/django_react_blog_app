import React from "react";
import "./pages.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page_not_found">
      <div className="info">
        <h1>404</h1>
        <h3>This page could not be found</h3>
        <p>
          Go back to home page <Link to="/"> Home</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
