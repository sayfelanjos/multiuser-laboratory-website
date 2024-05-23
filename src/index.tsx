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
import ImpactCalendar from "./pages/ImpactCalendar";
import MTSCalendar from "./pages/MTSCalendar";
import DurometerCalendar from "./pages/DurometerCalendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "home",
        element: <Navigate to="/" />,
      },
      {
        path: "calendar",
        children: [
          {
            path: "durometer",
            element: <DurometerCalendar />,
          },
          {
            path: "impact",
            element: <ImpactCalendar />,
          },
          {
            path: "mts",
            element: <MTSCalendar />,
          },
          {
            path: "mev",
            element: <MTSCalendar />,
          },
        ],
      },
      {
        path: "quote-request",
        element: <QuoteRequest />,
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
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <DevSupport
      ComponentPreviews={ComponentPreviews}
      useInitialHook={useInitial}
    >
      <RouterProvider router={router} />
    </DevSupport>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
