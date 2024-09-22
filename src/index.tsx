import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./global.scss";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/Home";
import TensileTest from "./pages/Services/TensileTest";
import RootLayout from "./components/RootLayout";
import QuoteRequest from "./pages/QuoteRequest";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import NotFound from "./pages/NotFound";
import CompressionTest from "./pages/Services/CompressionTest";
import FlexionTest from "./pages/Services/FlexionTest";
import FadigueTest from "./pages/Services/FadigueTest";
import CharpyImpactTest from "./pages/Services/CharpyImpactTest";
import TenacityTest from "./pages/Services/TenacityTest";
import ScanningElectronMicroscopyCalendar from "./pages/ScanningElectronMicroscopyCalendar";
import DurometerCalendar from "./pages/DurometerCalendar";
import ImpactPendulumCalendar from "./pages/ImpactPendulumCalendar";
import MechanicTestCalendar from "./pages/MechanicTestCalendar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SchedulerAppLayout from "./components/SchedulerLayout";
import SchedulePage from "./pages/Scheduler";
import UsersList from "./pages/UsersList";
import UserRegister from "./pages/UserAdd";
import UserEdit from "./pages/UserEdit";
import { Provider } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore as db } from "./firebase";
import store from "./redux/store/store";
import ResetPassword from "./pages/ResetPassword";
import RequestToResetPassword from "./pages/RequestToResetPassword";
import UserProfile from "./pages/UserProfile";
import { App } from "antd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
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
    ],
  },
  {
    path: "app",
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
          {
            path: "list",
            element: <UsersList />,
          },
          {
            path: "add",
            element: <UserRegister />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          {
            path: "edit/:userId",
            element: <UserEdit />,
            loader: async ({ params }) => {
              const docRef = doc(db, "users", `${params.userId}`);
              const docSnap = await getDoc(docRef);
              return { key: docSnap.id, userId: docSnap.id, ...docSnap.data() };
            },
          },
        ],
      },
      {
        path: "quote-request",
        element: <QuoteRequest />,
      },
    ],
  },
]);

if ("serviceWorker" in navigator) {
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
