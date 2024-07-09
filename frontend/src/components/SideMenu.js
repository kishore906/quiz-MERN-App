import "./sideMenu.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SideMenu() {
  const { user } = useSelector((state) => state.auth);
  const [arrowStatus, setArrowStatus] = useState(false);

  useEffect(() => {
    const rightArrowBtn = document.querySelector(".bi-chevron-right");
    const leftArrowBtn = document.querySelector(".bi-chevron-left");
    const sideMenu = document.querySelector(".sideMenuSection");

    const arrowBtnClick = (e) => {
      sideMenu.classList.toggle("open");
    };

    rightArrowBtn?.addEventListener("click", arrowBtnClick);
    leftArrowBtn?.addEventListener("click", arrowBtnClick);

    return () => {
      rightArrowBtn?.removeEventListener("click", arrowBtnClick);
      leftArrowBtn?.removeEventListener("click", arrowBtnClick);
    };
  }, []);

  return (
    <section className="sideMenuSection">
      <div className="arrows">
        {arrowStatus ? (
          <i
            className="bi bi-chevron-left"
            onClick={() => setArrowStatus((prev) => !prev)}
          ></i>
        ) : (
          <i
            className="bi bi-chevron-right"
            onClick={() => setArrowStatus((prev) => !prev)}
          ></i>
        )}
      </div>

      <div className="sideMenuLinks">
        <div className="menuLinkDiv">
          <i className="bi bi-graph-up"></i>
          <Link
            to={user?.role === "user" ? "/dashboard" : "/dashboard/admin/stats"}
            className="menuLink"
          >
            Stats
          </Link>
        </div>
        <div className="menuLinkDiv">
          <i className="bi bi-person-fill"></i>
          <Link to="updateProfile" className="menuLink">
            UpdateProfile
          </Link>
        </div>
        <div className="menuLinkDiv">
          <i className="bi bi-eye-slash-fill"></i>
          <Link to="updatePassword" className="menuLink">
            UpdatePassword
          </Link>
        </div>

        {user?.role === "admin" && (
          <>
            <div className="menuLinkDiv">
              <i className="bi bi-people-fill"></i>
              <Link to="admin/allUsers" className="menuLink">
                All Users
              </Link>
            </div>

            <div className="menuLinkDiv">
              <i className="bi bi-list-ol"></i>
              <Link to="admin/createQuizQuestions" className="menuLink">
                Create Quiz Questions
              </Link>
            </div>

            <div className="menuLinkDiv">
              <i className="bi bi-question-diamond-fill"></i>
              <Link to="admin/viewQuestions" className="menuLink">
                View Questions
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default SideMenu;
