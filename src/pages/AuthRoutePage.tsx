import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginPage from "./LoginPage";

const AuthRoutePage = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : <LoginPage />;
};

export default AuthRoutePage;
