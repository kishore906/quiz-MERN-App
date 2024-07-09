import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import DashboardMainSection from "./pages/DashboardMainSection";
import Stats from "./components/Stats";
import UpdatePassword from "./components/UpdatePassword";
import AdminStats from "./components/AdminStats";
import AllUsers from "./components/AllUsers";
import ViewAllQuestions from "./components/ViewAllQuestions";
import AddNewQuestion from "./components/AddNewQuestion";
import NotFound from "./pages/NotFound";
import UpdateProfile from "./components/UpdateProfile";
import ViewQuestion from "./components/ViewQuestion";
import EditQuestion from "./components/EditQuestion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="alignment">
      <BrowserRouter>
        <Header />
        <ToastContainer position="top-right" theme="dark" />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardMainSection />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              }
            />
            <Route
              path="updateProfile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="updatePassword"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/stats"
              element={
                <ProtectedRoute admin={true}>
                  <AdminStats />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/allUsers"
              element={
                <ProtectedRoute admin={true}>
                  <AllUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/viewQuestions"
              element={
                <ProtectedRoute admin={true}>
                  <ViewAllQuestions />
                </ProtectedRoute>
              }
            />
            <Route
              path="question"
              element={
                <ProtectedRoute admin={true}>
                  <ViewQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="editQuestion"
              element={
                <ProtectedRoute admin={true}>
                  <EditQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/createQuizQuestions"
              element={
                <ProtectedRoute admin={true}>
                  <AddNewQuestion />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
