import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });

      if (!response.data.token) {
        throw new Error("Token not found in response");
      }

      const { token } = response.data;
      // Store token securely (e.g., in local storage)
      localStorage.setItem("token", token);
      alert("Logged In!");
      navigate("/");
    } catch (error) {
      alert("Incorrect Username or Password!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <label className="text-lg font-semibold">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <label className="text-lg font-semibold">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
