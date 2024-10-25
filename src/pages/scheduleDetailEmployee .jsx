import React, { useEffect, useRef, useState } from "react";
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
import ScheduleList from "../components/scheduleList";

const MIN_TEXTAREA_HEIGHT = 32;

export default function ScheduleDetailEmployee() {
  const stateEmployee = useSelector(selectEmployee);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef(null);

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
      message.success("Data berhasil di update !");
      navigate("/schedule-employee");
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
          style={{
            backgroundColor: "#EEE",
            width: "100%",
            overflowY: "scroll",
          }}
        >
          <div
            style={{
              backgroundColor: "#D9D9D9",
              height: "100%",
              position: "fixed",
              width: "79%",
            }}
          >
            <div className="ps-2 mb-3 py-1">
              <h2 className="mb-1">Employee Schedule Edit</h2>
            </div>
            {stateEmployee.status === "loading" && <p>Loading</p>}
            {stateEmployee.status === "success" && (
              <div
                style={{ backgroundColor: "rgba(238, 238, 238, 0.93)" }}
                className="mx-4 mt-1 border"
              >
                <h5 className="ms-2">{nama}</h5>
                <h6 className="ms-4">Schedule :</h6>
                  {Array.isArray(schedule) ? (
                   <ul className="pe-4">
                      {schedule.map((scheduleVal, idx) => (
                        <ScheduleList key={idx} scheduleId={id} index={idx} item={scheduleVal}/>
                      ))}
                    </ul>
                    
                  ) : (
                    <p className="ms-4">No schedule available</p>
                  )} 
                <div className="mb-2">
                  <Link to={"/schedule-employee"}>
                    <button className="btn btn-primary ms-2 mt-2">Back</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
