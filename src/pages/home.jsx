import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import { authService } from "../configs/auth";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { APIEmployees } from "../apis/APIEmployees";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetEmployees,
  selectEmployees,
} from "../store/employees/indexEployeesSplice";

export default function Home() {
  const stateEmployees = useSelector(selectEmployees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetEmployees());
  }, [dispatch.employeesData]);

  return (
    <>
      <div className="wrapper d-flex align-items-stretch">
        <nav
          style={{
            display: "flex",
            height: "100vh",
            overflow: "scroll initial",
          }}
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
            <CDBSidebarMenuItem className="my-0 py-0 fs-5 ms-0 mb-1">
              Employee
            </CDBSidebarMenuItem>
            <CDBSidebarContent className="sidebar-content my-0 py-0">
              <CDBSidebarMenu className="pt-0">
                <hr />
                <NavLink to="/">
                  <div
                    className="d-flex justify-content-between mb-0 navBar"
                    style={{ backgroundColor: "#3A4750" }}
                  >
                    <CDBSidebarMenuItem>List</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
                  </div>
                </NavLink>

                <NavLink to="/add-employee">
                  <div className="d-flex justify-content-between my-0 navBar">
                    <CDBSidebarMenuItem>Add</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
                  </div>
                </NavLink>

                <NavLink to="/schedule-employee">
                  <div className="d-flex justify-content-between navBar">
                    <CDBSidebarMenuItem>Schedule</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem>{">"}</CDBSidebarMenuItem>
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
                <hr />
                <NavLink
                  to={'/add-admin'}
                  style={{ color: "white" }}
                >
                  Add New Admin
                </NavLink>
              </div>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  paddingBottom: "20px",
                  marginTop:"0"
                }}
              >
                <NavLink
                  style={{ color: "white" }}
                  onClick={() => authService.logOut()}
                >
                  Log out
                </NavLink>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </nav>

        {/* content */}
        <div
          className="px-3"
          style={{ backgroundColor: "#EEE", width: "100%" }}
        >
          <div
            className="text-center mt-2 mb-3 py-1"
            style={{ backgroundColor: "#D9D9D9" }}
          >
            <h2>Employee List</h2>
          </div>

          <div>
            <table
              style={{ width: "100%", backgroundColor: "#E7E7E7" }}
              className="border border-3"
            >
              <thead style={{ backgroundColor: "#D9D9D9" }} className="mb-2">
                <tr className="text-center">
                  <th className="fs-5">Name</th>
                  <th className="fs-5">Alamat</th>
                  <th className="fs-5">No.HP</th>
                  <th className="fs-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stateEmployees.status === "loading" && (
                  <tr>
                    <td>
                      <p style={{ width: "100%" }} className="text-center">
                        Loading...
                      </p>
                    </td>
                  </tr>
                )}

                {stateEmployees.status === "success" &&
                  stateEmployees.data &&
                  stateEmployees.data.map((val, index) => (
                    <tr
                      val={val}
                      key={index}
                      className="text-center border"
                      style={{ backgroundColor: "rgba(238, 238, 238, 0.93)" }}
                    >
                      <td>{val.name}</td>
                      <td>{val.address}</td>
                      <td>0{val.phoneNumber}</td>
                      <td>
                        <Link to={`/employee/${val.id}`}>
                          <button className="btn btn-success me-1">
                            Update
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger me-1"
                          onClick={() =>
                            APIEmployees.deleteEmployee(val.id).then(() =>
                              navigate(0)
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
