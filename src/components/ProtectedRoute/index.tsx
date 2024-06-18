import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  children: React.ReactElement;
}
const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, user } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
