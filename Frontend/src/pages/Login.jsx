import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axios";
import "../styles/Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}

        {/* Switch to signup */}
        <div className="switch-link">
          New user? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}