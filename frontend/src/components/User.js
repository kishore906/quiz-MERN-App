import "./user.css";

function User({ user, isLoading, deleteUser }) {
  const overallAccuracy =
    user?.quizzessAttempted?.reduce((acc, quiz) => acc + quiz?.accuracy, 0) /
    user?.quizzessAttempted.length;

  return (
    <div className="user">
      <div className="userDetailsDiv">
        <div className="userImg">
          <img
            src={
              user?.profilePhoto
                ? user?.profilePhoto?.url
                : "/images/default_avatar.jpg"
            }
            alt="user_img"
          />
        </div>
        <div className="userDetails">
          <ul>
            <li>
              <p>
                Name:
                <span> {user?.fullName}</span>
              </p>
            </li>
            <li>
              <p>
                Email:
                <span> {user?.email}</span>
              </p>
            </li>
            <li>
              <p>
                Quizzess Given:
                <span> {user?.quizzessAttempted.length}</span>
              </p>
            </li>
            <li>
              <p>
                Accuracy:
                <span>
                  {" "}
                  {overallAccuracy ? Math.ceil(overallAccuracy) : 0}%
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <button
        className="deleteBtn"
        disabled={isLoading}
        onClick={() => deleteUser(user._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default User;
