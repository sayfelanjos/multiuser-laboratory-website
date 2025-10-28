import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./global.scss";
import RootLayout from "./components/RootLayout";
import SchedulerAppLayout from "./components/SchedulerLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";
import TensileTest from "./pages/Services/TensileTest";
import NotFound from "./pages/NotFound";
import CompressionTest from "./pages/Services/CompressionTest";
import FlexionTest from "./pages/Services/FlexionTest";
import FadigueTest from "./pages/Services/FadigueTest";
import CharpyImpactTest from "./pages/Services/CharpyImpactTest";
import TenacityTest from "./pages/Services/TenacityTest";
import QuoteRequest from "./pages/QuoteRequest";
import ScanningElectronMicroscopyCalendar from "./pages/ScanningElectronMicroscopyCalendar";
import DurometerCalendar from "./pages/DurometerCalendar";
import ImpactPendulumCalendar from "./pages/ImpactPendulumCalendar";
import MechanicTestCalendar from "./pages/MechanicTestCalendar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SchedulePage from "./pages/Scheduler";
import VerifyEmail from "./pages/VerifyEmail";
import UsersList from "./pages/UsersList";
import UserRegister from "./pages/UserAdd";
import UserEdit from "./pages/UserEdit";
import ResetPassword from "./pages/ResetPassword";
import RequestToResetPassword from "./pages/RequestToResetPassword";
import UserProfile from "./pages/UserProfile";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { Provider } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore as db } from "./firebase";
import store from "./redux/store/store";
import { App } from "antd";
import AccessDenied from "./pages/AccessDenied";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "request-to-reset-password",
        element: <RequestToResetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "calendar",
        children: [
          {
            path: "",
            element: <Navigate to="/calendar/durometer" />,
          },
          {
            path: "durometer",
            element: <DurometerCalendar />,
          },
          {
            path: "mechanic-test",
            element: <MechanicTestCalendar />,
          },
          {
            path: "scanning-electron-microscopy",
            element: <ScanningElectronMicroscopyCalendar />,
          },
          {
            path: "impact-pendulum",
            element: <ImpactPendulumCalendar />,
          },
        ],
      },

      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "service",
        children: [
          {
            path: "tenacity-test",
            element: <TenacityTest />,
          },
          {
            path: "compression-test",
            element: <CompressionTest />,
          },
          {
            path: "tensile-test",
            element: <TensileTest />,
          },
          {
            path: "fatigue-test",
            element: <FadigueTest />,
          },
          {
            path: "flexion-test",
            element: <FlexionTest />,
          },
          {
            path: "charpy-impact-test",
            element: <CharpyImpactTest />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "app",
    // AUTHENTICATION GATE
    element: <ProtectedRoute />,
    children: [
      // If auth succeeds, render the layout component
      {
        element: <SchedulerAppLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/app/scheduler" />,
          },
          {
            path: "scheduler",
            element: <SchedulePage />,
          },
          {
            path: "users",
            children: [
              // ===============================================================
              // Authenticated only (already protected by top level /app route):
              // ===============================================================
              {
                path: "profile",
                element: <UserProfile />,
              },
              {
                path: "verify-email",
                element: <VerifyEmail />,
              },
              // ===============================================================
              // Admin-only path group (List, Add):
              // ===============================================================
              {
                element: <ProtectedRoute allowedRoles={["admin"]} />,
                children: [
                  {
                    path: "list",
                    element: <UsersList />,
                  },
                  {
                    path: "add",
                    // element: <UserRegister />,
                    element: <AccessDenied />,
                  },
                ],
              },
              // ===============================================================
              // Admin OR Self-Edit path:
              // ===============================================================
              {
                // If not admin, allows if URL ID matches current user ID
                path: "edit/:userId",
                element: (
                  <ProtectedRoute allowedRoles={["admin"]} allowSelf={true} />
                ),
                children: [
                  {
                    // Renders the UserEdit component
                    path: "",
                    element: <UserEdit />,
                    loader: async ({ params }) => {
                      const docRef = doc(db, "users", `${params.userId}`);
                      const docSnap = await getDoc(docRef);
                      return {
                        key: docSnap.id,
                        userId: docSnap.id,
                        ...docSnap.data(),
                      };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: "quote-request",
            element: <QuoteRequest />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

if ("serviceWorker" in navigator && process.env.NODE_ENV !== "development") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log("ServiceWorker registration successful: ", registration);
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      },
    );
  });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <App>
    <Provider store={store}>
      <React.StrictMode>
        <DevSupport
          ComponentPreviews={ComponentPreviews}
          useInitialHook={useInitial}
        >
          <RouterProvider router={router} />
        </DevSupport>
      </React.StrictMode>
    </Provider>
  </App>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
