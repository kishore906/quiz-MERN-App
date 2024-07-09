import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./updateProfile.css";
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from "../redux/api/userApi";

function UpdateProfile() {
  const { user } = useSelector((state) => state.auth);
  const { error, data } = useGetUserQuery();
  const [
    updateProfile,
    { isLoading, isSuccess, error: updateErr, data: updateProfileData },
  ] = useUpdateProfileMutation();

  const [userDetails, setUserDetails] = useState({});
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePhotoPreview(reader.result);
        setProfilePhoto(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userDataToUpdate = {
      fullName: userDetails.fullName,
      email: userDetails.email,
      profilePhoto:
        profilePhoto !== "" ? profilePhoto : userDetails?.profilePhoto,
    };
    //console.log(userDataToUpdate);
    updateProfile(userDataToUpdate);
  };

  useEffect(() => {
    if (data) {
      setUserDetails({
        fullName: data?.user?.fullName,
        email: data?.user?.email,
        profilePhoto: data?.user?.profilePhoto,
      });
      setProfilePhotoPreview(
        data?.user?.profilePhoto
          ? data?.user?.profilePhoto?.url
          : "/images/default_avatar.jpg"
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      return;
    }

    if (updateErr) {
      toast.error(updateErr?.data?.message);
      return;
    }

    if (isSuccess) {
      toast.success(updateProfileData?.message);
      navigate(
        `${user?.role === "user" ? "/dashboard" : "/dashboard/admin/stats"}`
      );
    }
  }, [
    error,
    updateErr,
    isSuccess,
    updateProfileData?.message,
    navigate,
    user?.role,
  ]);

  return (
    <section className="updateProfileSection">
      <div className="userAuth_container">
        <h3 className="updateHeading">Update Profile</h3>

        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="fullName"
            value={userDetails?.fullName}
            onChange={handleChange}
            placeholder="Enter fullName.."
          />
          <input
            type="text"
            name="email"
            value={userDetails?.email}
            onChange={handleChange}
            placeholder="Enter email.."
          />
          <div className="profileImgContainer">
            <div className="imgDiv">
              <img src={profilePhotoPreview} alt="profile_img" />
            </div>
            <input
              type="file"
              name="profileImg"
              accept="images/*"
              onChange={handlePhotoUpload}
            />
          </div>
          <button disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateProfile;
