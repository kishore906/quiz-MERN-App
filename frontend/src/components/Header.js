import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useLazySignOutQuery } from "../redux/api/authApi";
import { logOut } from "../redux/slice/userSlice";
import { reset } from "../redux/slice/quizSlice";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [signOut, { isSuccess }] = useLazySignOutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    signOut();
  };

  useEffect(() => {
    if (user) {
      const barIcon = document.querySelector(".bi-list");
      const closeIcon = document.querySelector(".bi-x-lg");
      const nav = document.querySelector("nav");

      function barIconClick(e) {
        nav.style.height = "31%";
      }

      function closeIconClick(e) {
        nav.style.height = "0%";
      }

      barIcon.addEventListener("click", barIconClick);
      closeIcon.addEventListener("click", closeIconClick);

      return () => {
        barIcon.removeEventListener("click", barIconClick);
        closeIcon.removeEventListener("click", closeIconClick);
      };
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(logOut());
      navigate("/");
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <header>
      <div className="container">
        <div className="nav_container">
          <div className="logo">
            <img src="/images/logo.png" alt="logo_img" />
            <h2>
              <Link to="/">QuizQuest</Link>
            </h2>
          </div>

          {user && (
            <>
              <nav>
                <span>
                  <i className="bi bi-x-lg"></i>
                </span>

                <ul>
                  <li>
                    <Link to="/home" onClick={() => dispatch(reset())}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        user.role === "user"
                          ? "/dashboard"
                          : "/dashboard/admin/stats"
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="logoutBtn" onClick={handleSignOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>

              <span>
                <i className="bi bi-list"></i>
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
