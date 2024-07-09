import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./updatePassword.css";
import { useUpdatePasswordMutation } from "../redux/api/userApi";

function UpdatePassword() {
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ oldPassword: "", password: "" });
  const [updatePassword, { isLoading, isSuccess, error, data }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    updatePassword(form);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
      return;
    }

    if (isSuccess) {
      toast.success(data?.message);
      navigate(
        `${user?.role === "user" ? "/dashboard" : "/dashboard/admin/stats"}`
      );
    }
  }, [isSuccess, error, data?.message, navigate, user?.role]);

  return (
    <section className="updatePasswordSection">
      <div className="userAuth_container">
        <h3 className="updateHeading">Update Password</h3>

        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Enter Old Password.."
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter New Password.."
            required
          />
          <button disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdatePassword;
