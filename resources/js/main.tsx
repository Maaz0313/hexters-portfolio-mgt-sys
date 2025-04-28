// This file is now deprecated in favor of app.tsx
// It's kept for reference purposes

import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout";
import "./index.css";
import About from "./pages/About";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ErrorPage from "./pages/ErrorPage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import LaravelBackend from "./pages/LaravelBackend";
import Marketing from "./pages/Marketing";
import Shopify from "./pages/Shopify";
import Amazon from "./pages/Amazon";
import Branding from "./pages/Branding";

// This file is now deprecated. The routing is handled by Inertia.js in app.tsx
// See resources/js/layouts/main-layout.tsx for the new layout implementation

/*
// Original React Router configuration:
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "branding",
        element: <Branding />,
      },
      {
        path: "laravel-backend",
        element: <LaravelBackend />,
      },
      {
        path: "marketing",
        element: <Marketing />,
      },
      {
        path: "shopify",
        element: <Shopify />,
      },
      {
        path: "amazon",
        element: <Amazon />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <Home />
    </Layout>
  </React.StrictMode>,
);
*/

