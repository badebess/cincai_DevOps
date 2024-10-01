// SideBar References : https://www.devwares.com/blog/create-responsive-sidebar-in-react/

import '../App.css';
import React from "react";
import { authService } from "../configs/auth";
import {
    CDBIcon,
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export default function SideBar() {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#FFFFFF" backgroundColor="#303841">
        <CDBSidebarHeader className="text-center">
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Admin Wash MAC
          </a>
        </CDBSidebarHeader>
        <CDBSidebarMenuItem className="my-0 py-0 fs-5 ms-0 mb-1">Employee</CDBSidebarMenuItem>
        <CDBSidebarContent className="sidebar-content my-0 py-0">
          <CDBSidebarMenu className="pt-0">
            <NavLink exact to="/" activeClassName="activeClicked">
                <div className="d-flex justify-content-between mb-0 navBar" style={{backgroundColor:"#3A4750"}}>
                    <CDBSidebarMenuItem >List</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>></CDBSidebarMenuItem>
                </div>
            </NavLink>
            <NavLink exact to="/tables" activeClassName="activeClicked" >
                <div className="d-flex justify-content-between my-0 navBar">
                    <CDBSidebarMenuItem>Add</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>></CDBSidebarMenuItem>
                </div>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
                <div className="d-flex justify-content-between navBar">
                    <CDBSidebarMenuItem>Schedule</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>></CDBSidebarMenuItem>
                </div>
            </NavLink>
  
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px",
            }}
          >
            <NavLink
              activeClassName="activeClicked"
              style={{color:"white"}}
              onClick={()=>authService.logOut()}
            >
                Log out
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
