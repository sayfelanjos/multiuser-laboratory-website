import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AccessDenied from "../../pages/AccessDenied";
import { Spinner } from "react-bootstrap";
import { type UserRoleTypes } from "../../types/userInfo";

interface ProtectedRouteProps {
  // Roles allowed to view the route. If undefined, only checks authentication.
  allowedRoles?: UserRoleTypes[];
  // If true, allows a user to access the route if their ID matches the :userId URL param.
  allowSelf?: boolean;
}

const ProtectedRoute = ({
  allowedRoles,
  allowSelf = false,
}: ProtectedRouteProps) => {
  const { isLoading, user, role: userRole } = useAuth();
  const location = useLocation();
  const { userId: urlUserId } = useParams();

  // 1. Loading State
  if (isLoading) {
    return (
      <h1 className="text-center" style={{ fontSize: "5rem" }}>
        {/* <span>Loading...</span>; */}
        <Spinner />
      </h1>
    );
  }

  // 2. Authentication Check
  if (!user) {
    // Redirect to sign in, passing the original path
    console.log("Unauthenticated access. Redirecting to /signin.");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // --- 3. Authorization (Role & Self-Edit) Check ---
  const currentUserId = user.uid; // Assuming the user object has a uid property
  let isAuthorized = false;

  // No Role or Self Access condition is set: authorize by authentication only:
  if ((!allowedRoles || allowedRoles.length === 0) && !allowSelf) {
    // console.log(`User authenticated authorized!`);
    isAuthorized = true;
  }

  // Check if the user's role is in the list of allowed roles
  if (!isAuthorized && allowedRoles && allowedRoles.length > 0 && userRole) {
    if (allowedRoles.includes(userRole)) {
      // console.log(`User authorized, role: ${userRole}`);
      isAuthorized = true;
    }
  }

  // Self-Edit Override: Allows a non-admin user to edit their own profile/resource
  if (!isAuthorized && allowSelf && urlUserId && currentUserId) {
    if (urlUserId === currentUserId) {
      // console.log(`User authorized: Self Access.`);
      isAuthorized = true;
    }
  }

  // 4. Final Gate Decision
  if (isAuthorized) {
    // Authorized: Render the nested content/layout via <Outlet />
    // NOTE: This component is used as a Route element, so it MUST return <Outlet />
    // to render its children defined in index.tsx.
    return <Outlet />;
  }

  // Not Authorized: Show 403 Forbidden page
  console.warn(`User level "${userRole}" denied access.`);
  return <AccessDenied />;
};

export default ProtectedRoute;
