import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
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
import { message } from "antd";
import {
  fetchGetEmployeeById,
  selectEmployee,
} from "../store/employee/indexEployeeSplice";

export default function DetailEmployee() {
  const stateEmployee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetEmployeeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (stateEmployee.status === "success") {
      setNama(stateEmployee.data.name);
      setAlamat(stateEmployee.data.address);
      setNoHp(stateEmployee.data.phoneNumber);
      setPortofolio(stateEmployee.data.portofolio);
      setSchedule(stateEmployee.data.schedule);
    }
  }, [stateEmployee.data]);

  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();
  const [noHp, setNoHp] = useState();
  const [portofolio, setPortofolio] = useState();
  const [schedule, setSchedule] = useState();
  const [inputChange, setInputChange] = useState(false);

  function UpdateData(e) {
    e.preventDefault();
    try {
      APIEmployees.updateEmployee(id, {
        name: nama,
        address: alamat,
        phoneNumber: noHp,
        portofolio: portofolio,
        schedule: schedule,
      });
      message.success("Data berhasil di update !").then(() => navigate(`/`));
    } catch (error) {
      console.log(error);
      message.error("Ada yang tidak benar !");
    }
  }

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
                  <div className="d-flex justify-content-between mb-0 navBar">
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
          <div style={{ backgroundColor: "#D9D9D9", height: "100%" }}>
            <div className="text-center mb-3 py-1">
              <h2>Employee Detail</h2>
            </div>

            <div
              style={{
                backgroundColor: "rgba(238, 238, 238, 0.93)",
                height: "90%",
              }}
              className="mx-4"
            >
              {stateEmployee.status === "loading" && (
                <p style={{ width: "100%" }}>Loading...</p>
              )}
              {stateEmployee.status === "success" && (
                <>
                  <div>
                    <form
                      className="fs-4 pb-2"
                      style={{ paddingLeft: "50px", paddingRight: "50px" }}
                      onSubmit={(e) => UpdateData(e)}
                    >
                      <label htmlFor="name" className="form-label mt-4">
                        Nama
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "600px" }}
                        value={nama}
                        onChange={(e) => {
                          setInputChange(true);
                          setNama(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="name" className="form-label mt-4">
                        Alamat
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "600px" }}
                        value={alamat}
                        onChange={(e) => {
                          setInputChange(true);
                          setAlamat(e.target.value);
                        }}
                      ></input>
                      <label htmlFor="name" className="form-label mt-4">
                        No.HP
                      </label>
                      <div className="col-12 pb-4">
                        <span className="position-absolute mt-2 ms-3 fs-6">
                          0
                        </span>
                        <input
                          type="number"
                          className="form-control ps-4"
                          style={{ width: "600px" }}
                          value={noHp}
                          onChange={(e) => {
                            setInputChange(true);
                            setNoHp(e.target.value);
                          }}
                        ></input>
                      </div>
                      <label htmlFor="name" className="form-label mt-4">
                        Portofolio
                      </label>
                      <textarea
                        className="form-control"
                        style={{ maxHeight: "150px", minHeight: "150px" }}
                        value={portofolio}
                        onChange={(e) => {
                          setInputChange(true);
                          setPortofolio(e.target.value);
                        }}
                      ></textarea>

                      {inputChange == false ? (
                        ""
                      ) : (
                        <button
                          className="btn btn-primary form-control mt-2"
                          type="submit"
                        >
                          Update
                        </button>
                      )}
                    </form>
                  </div>
                </>
              )}
              <Link to={"/"}>
                <button
                  className="btn btn-primary form-control mt-2"
                  type="submit"
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
