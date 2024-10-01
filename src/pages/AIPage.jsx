import { Button, Form, Layout, Space, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import { openai } from "../configs/openai";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { authService } from "../configs/auth";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

export default function AIPage() {
  const { form } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState([]);

  async function onFinish(values) {
    setChat([
      ...chat,
      {
        q: values.query,
        a: null,
      },
    ]);

    setIsLoading(true);
    const response = await openai.chat.completions
      .create({
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content:
              "apa yang anda ketahui mengenai tentang javascript, jangan berikan jawaban untuk soal ini tetapi untuk soal selanjutnya dan jika soal berikutnya diluar dari mengenai javascript berikan sebuah jawaban `saya tidak mengetahui hal tersebut, mungkin anda boleh menanyakan saja hal mengenai JavaScript ?`" +
              values.query,
          },
        ],
      })
      .then((response) => {
        setChat([
          ...chat,
          {
            q: values.query,
            a: response.choices[0].message.content,
          },
        ]);
        setIsLoading(false);
      });
  }

  return (
    <>
    {console.log()}
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

                <NavLink to="/Wash-MAC-AI">
                  <div
                    className="d-flex justify-content-between navBar"
                    style={{ backgroundColor: "#3A4750" }}
                  >
                    <CDBSidebarMenuItem>Wash MAC AI (Beta)</CDBSidebarMenuItem>
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
          <Layout
            style={{
              backgroundColor: "#D9D9D9",
              height: "100%",
              position: "fixed",
              width: "80%",
            }}
          >
            <h3 className="text-center">Wash MAC Chat GPT Version</h3>
            <Content className="px-2">
              <div className="text-start">
                {chat.map((item,index) => (
                  <div key={index}>
                    <p className="question">Q : {item["q"]}</p>
                    <div className="answer">
                      A :{" "}
                      {item["a"] ? (
                        ` ${item["a"]}`
                      ) : (
                        <Space size="small">
                          <Spin size="small" />
                        </Space>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Form className="form" form={form} onFinish={onFinish}>
                <Form.Item name="query">
                  <TextArea />
                </Form.Item>
                {isLoading ? (
                  "Generating"
                ) : (
                  <>
                    <Button type="primary" htmlType="submit">
                      send
                    </Button>
                  </>
                )}
              </Form>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
}
