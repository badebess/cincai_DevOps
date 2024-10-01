import React from "react";
import { authService } from "../configs/auth";
import { Outlet } from "react-router-dom";
import { Unauthorized } from "../pages/Unauthorized";
import { Layout } from "../components/layout";
import { Login } from "../pages/login";

export function PrivateRoute() {
  if (!authService.isAuthorized()) return <Unauthorized />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
