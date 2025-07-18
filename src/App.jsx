import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Upload from "./Pages/Upload";
import NavBar from "./Components/NavBar";
import Profile_User from "./Pages/Profile_User";
import Settings_User from "./Pages/Settings_User";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminRoute from "./context/AdminRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AdminDashboard from "./Pages/pages-Admin/AdminDashboard";
import UsersAdmin from "./Pages/pages-Admin/UsersAdmin";
import ReportsAdmin from "./Pages/pages-Admin/ReportsAdmin";
import Models from "./Pages/pages-Admin/ModelsAdmin";
import ModalitiesAdmin from "./Pages/pages-Admin/ModalitiesAdmin";
import AnatomiesAdmin from "./Pages/pages-Admin/AnatomiesAdmin";
import RadiologyDetailsAdmin from "./Pages/pages-Admin/RadiologyDetailsAdmin";
import ErrorPage from "./Pages/ErrorPage";
import VerifyEmail from "./Pages/VerifyEmail";

//Css//
import "./App.css";
import AdminPanel from "./Components/Admin/AdminPanel";
import FilesAdmin from "./Pages/pages-Admin/FilesAdmin";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* مسار رئيسي يحتوي على كل شيء تحت /AI_Radiologist */}
          <Route path="/">
            {/* الصفحة الرئيسية /AI_Radiologist */}
            <Route index element={<Home />} />
            <Route path="AI_Radiologist/Home" element={<Home />} />
            <Route path="AI_Radiologist/our-vision" element={<Home />} />
            <Route path="AI_Radiologist/Registration" element={<Registration />} />
            <Route path="AI_Radiologist/Login" element={<Login />} />
            <Route path="AI_Radiologist/forgot-password" element={<ForgotPassword />} />
            <Route path="AI_Radiologist/Verify-Email" element={<VerifyEmail />} />
            <Route
              path="AI_Radiologist/reset-password/:uid/:token"
              element={<ResetPassword />}
            />
            <Route
              path="AI_Radiologist/Upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
                // <Upload />
              }
            />
            <Route path="AI_Radiologist/NavBar" element={<NavBar />} />
            <Route
              path="AI_Radiologist/Profile_User"
              element={
                <ProtectedRoute>
                  <Profile_User />
                </ProtectedRoute>
              }
            />
            <Route
              path="AI_Radiologist/Settings_User"
              element={
                <ProtectedRoute>
                  <Settings_User />
                </ProtectedRoute>
              }
            />

            {/* مسارات المشرف */}
<Route element={<AdminRoute />}>
  <Route path="AI_Radiologist/AdminPanel" element={<AdminPanel />}>
    <Route index element={<AdminDashboard />} />
    <Route path="UsersAdmin" element={<UsersAdmin />} />
    <Route path="ReportsAdmin" element={<ReportsAdmin />} />
    <Route path="ModelsAdmin" element={<Models />} />
    <Route path="FilesAdmin" element={<FilesAdmin />} />
    <Route path="ModalitiesAdmin" element={<ModalitiesAdmin />} />
    <Route path="AnatomiesAdmin" element={<AnatomiesAdmin />} />
    <Route path="RadiologyDetailsAdmin" element={<RadiologyDetailsAdmin />} />
  </Route>
</Route>


            {/* صفحة الخطأ لأي مسار غير معروف تحت /AI_Radiologist */}
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* في حال أحد دخل أي مسار خارج /AI_Radiologist */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
