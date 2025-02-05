import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      await signup({ email, password });
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return { handleSignup, error };
}