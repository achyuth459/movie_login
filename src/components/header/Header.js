import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({}) => {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Cool-Coders</span>
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span>Sign In</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
