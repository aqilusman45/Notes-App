import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotesPage from "../pages/NotesPage";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      alert('You need to Login!')
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [navigate]);

  return <div>{isLoggedIn && <NotesPage/>}</div>;
};

export default Home;
