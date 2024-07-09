import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../redux/api/authApi";
import { setUser } from "../redux/slice/userSlice";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [signIn, { isLoading, isSuccess, error, data }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(form);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
      return;
    }

    if (isSuccess) {
      dispatch(setUser(data));
      navigate("/home");
    }
  }, [isSuccess, error, data, navigate, dispatch]);

  return (
    <section className="section">
      <div className="userAuth_container">
        <div className="userAuth_header">
          <img src="/images/logo.png" alt="logo_img" />
          <h1>QuizQuest</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="other_links">
          <Link>Forgot Password?</Link>
          <Link to="/signUp">Sign Up</Link>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
