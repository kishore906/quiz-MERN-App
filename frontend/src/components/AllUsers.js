import User from "./User";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../redux/api/adminApi";

function AllUsers() {
  const { error, data } = useGetAllUsersQuery();
  const [
    deleteUser,
    { isLoading, isSuccess, error: deleteErr, data: deleteMsg },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
      return;
    }

    if (deleteErr) {
      toast.error(deleteErr?.data?.message);
      return;
    }

    if (isSuccess) {
      toast.success(deleteMsg?.message);
    }
  }, [error, deleteErr, deleteMsg?.message, isSuccess]);

  return (
    <section className="allUsersSection">
      <h2>All Users</h2>
      <div className="allUsers">
        {data?.users &&
          data?.users.map((user) => (
            <User
              key={user._id}
              user={user}
              isLoading={isLoading}
              deleteUser={deleteUser}
            />
          ))}
      </div>
    </section>
  );
}

export default AllUsers;
