import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ admin, children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user?.isAuthenticated) return <Navigate to="/signIn" replace />;

  if (admin && user?.role !== "admin") return <Navigate to="/home" replace />;

  return children;
}

export default ProtectedRoute;
