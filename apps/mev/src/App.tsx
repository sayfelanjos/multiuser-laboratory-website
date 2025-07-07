import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "@lem-websites/template/src/pages/SignIn";
import SignUp from "@lem-websites/template/src/pages/SignUp";
import RootLayout from "@lem-websites/template/src/components/RootLayout";
import NotFound from "@lem-websites/template/src/pages/NotFound";
import HomePage from "@lem-websites/template/src/pages/Home";
import RequestToResetPassword from "@lem-websites/template/src/pages/RequestToResetPassword";
import ResetPassword from "@lem-websites/template/src/pages/ResetPassword";
import DurometerCalendar from "@lem-websites/template/src/pages/DurometerCalendar";
import MechanicTestCalendar from "@lem-websites/template/src/pages/MechanicTestCalendar";
import ScanningElectronMicroscopyCalendar from "@lem-websites/template/src/pages/ScanningElectronMicroscopyCalendar";
import ImpactPendulumCalendar from "@lem-websites/template/src/pages/ImpactPendulumCalendar";
import AboutPage from "@lem-websites/template/src/pages/About";
import ContactPage from "@lem-websites/template/src/pages/Contact";
import TenacityTest from "@lem-websites/template/src/pages/Services/TenacityTest";
import CompressionTest from "@lem-websites/template/src/pages/Services/CompressionTest";
import TensileTest from "@lem-websites/template/src/pages/Services/TensileTest";
import FadigueTest from "@lem-websites/template/src/pages/Services/FadigueTest";
import FlexionTest from "@lem-websites/template/src/pages/Services/FlexionTest";
import CharpyImpactTest from "@lem-websites/template/src/pages/Services/CharpyImpactTest";
import SchedulerAppLayout from "@lem-websites/template/src/components/SchedulerLayout";
import SchedulePage from "@lem-websites/template/src/pages/Scheduler";
import UsersList from "@lem-websites/template/src/pages/UsersList";
import UserRegister from "@lem-websites/template/src/pages/UserAdd";
import UserProfile from "@lem-websites/template/src/pages/UserProfile";
import UserEdit from "@lem-websites/template/src/pages/UserEdit";
import { firestore as db } from "./firebase.ts";
import QuoteRequest from "@lem-websites/template/src/pages/QuoteRequest";
import { doc, getDoc } from "firebase/firestore";

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
    errorElement: <NotFound />,
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

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
