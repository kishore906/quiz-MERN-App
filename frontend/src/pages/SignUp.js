import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../redux/api/authApi";

function SignUp() {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const navigate = useNavigate();

  const [signUp, { isLoading, isSuccess, error, data }] = useSignUpMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(user);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
      return;
    }

    if (isSuccess) {
      toast.success(data.message);
      navigate("/signIn");
    }
  }, [isSuccess, error, data, navigate]);

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
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="FullName"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="password"
          />
          <button disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="haveAccText">
          <span>Have an account?</span> <Link to="/signIn">Sign In</Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
