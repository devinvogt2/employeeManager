import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { logInUser } from "../axios-services/user";
import { AuthContext } from "../../src/context/AuthContext";

export function useLogin() {
  const { updateAuthStatus } = useContext(AuthContext);
  const history = useHistory();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, token } = await logInUser(form);
      localStorage.setItem("token", token);
      setError(null);
      updateAuthStatus();
      history.push("/login/confirm/msg");
    } catch (error) {
      setError("Server Error");
      console.error(error);
    }
  };
  return {
    h1: "Login",
    error,
    handleSubmit,
    handleChange,
  };
}
