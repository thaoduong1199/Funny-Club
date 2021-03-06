import ClubStatistics from "./AdminManagement/ClubManagement/clubStatistics";
import ClubSearch from "../AdminSystem/AdminManagement/ClubManagement/clubSearch";
import AddClub from "../AdminSystem/AdminManagement/ClubManagement/addClub";
import EventStatistics from "../AdminSystem/AdminManagement/EventManagement/EventStatisticsJsx/index";
import EventSearch from "../AdminSystem/AdminManagement/EventManagement/eventSearch";
import StudentSearchContainer from "../../components/AdminSystem/AdminManagement/StudentManagement/StudentSearch/index";
import StudentStaticsContainer from "../../components/AdminSystem/AdminManagement/StudentManagement/StudentStatics/index";
import "./AdminSystem.css";
import {
  actGetAllClubRequest,
  getChartClub,
} from "../../Redux/actions/user-clubs.action";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  AreaChartOutlined,
  FileImageOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UpdateclubContainer from "./AdminManagement/ClubManagement/Updateclub";
import UserDecent from "./AdminManagement/StudentManagement/StudentDecent/index";
import UpdateClubStructureContainer from "./AdminManagement/ClubManagement/Updateclub/UpdateClubWithStructureImage/index";
import WebBannerManage from "./AdminManagement/WebBannerManage/index";
import StaffRegister from "./AdminManagement/StaffRegister/index";
import BannerAction from "./AdminManagement/WebBannerManage/BannerAction/index";

const { Header, Content, Footer, Sider } = Layout;
function AdminSystem(props) {
  const { getAllClub, getChartClub } = props;

  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            width: 500,
            position: "fixed",
            left: 0,
            backgroundColor: "white",
          }}
        >
          <a href="">
            {" "}
            <img
              src="/images/logo.png"
              alt="logo"
              className="logo_admin"
            />{" "}
          </a>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            {/* Qu???n l?? c??u l???c b??? */}
            <SubMenu
              key="sub1"
              icon={<BarChartOutlined />}
              title="Qu???n l?? c??u l???c b???"
            >
              <Menu.Item key="1">
                <span>Th???ng k?? c??u l???c b???</span>
                <Link to="/adminsystem/ClubStatistics" />
              </Menu.Item>
              <Menu.Item key="2">
                <span>T??m ki???m c??u l???c b???</span>
                <Link to="/adminsystem/ClubSearch" />
              </Menu.Item>
              <Menu.Item key="3">
                <span>Th??m c??u l???c b???</span>
                <Link to="/adminsystem/addClub" />
              </Menu.Item>
            </SubMenu>
            {/* Qu???n l?? s??? ki???n */}
            <SubMenu
              key="sub2"
              icon={<AreaChartOutlined />}
              title="Qu???n l?? s??? ki???n"
            >
              <Menu.Item key="4">
                <span>Th???ng k?? s??? ki???n</span>
                <Link to="/adminsystem/EventStatistics" />
              </Menu.Item>
              <Menu.Item key="5">
                <span>T??m ki???m s??? ki???n</span>
                <Link to="/adminsystem/EventSearch" />
              </Menu.Item>
            </SubMenu>
            {/* Qu???n l?? sinh vi??n */}
            <SubMenu
              key="sub3"
              icon={<UserOutlined />}
              title="Qu???n l?? sinh vi??n"
            >
              <Menu.Item key="6">
                <span>Th???ng k?? sinh vi??n</span>
                <Link to="/adminsystem/StudentStatistics" />
              </Menu.Item>
              <Menu.Item key="7">
                <span>T??m ki???m sinh vi??n</span>
                <Link to="/adminsystem/StudentSearch" />
              </Menu.Item>
            </SubMenu>
            {/* Qu???n l?? web Banner */}
            <SubMenu key="sub4" icon={<FileImageOutlined />} title="Web Banner">
              <Menu.Item key="8">
                <span>H??nh ???nh c???a banner</span>
                <Link to="/adminsystem/BannerManage" />
              </Menu.Item>
            </SubMenu>
            {/* t???o staff */}
            <Menu.Item key="9" icon={<UserAddOutlined />}>
              <span>T???o t??i kho???n staff</span>
              <Link to="/adminsystem/CreateStaff" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center", minHeight: "630px" }}
            >
              <Route exact path="/adminsystem/" component={ClubStatistics} />
              <Route
                path="/adminsystem/ClubStatistics"
                component={ClubStatistics}
              />
              <Route path="/adminsystem/ClubSearch" component={ClubSearch} />
              <Route path="/adminsystem/addClub" component={AddClub} />
              {/* qu???n l?? s??? ki???n */}
              <Route
                path="/adminsystem/EventStatistics"
                component={EventStatistics}
              />
              <Route path="/adminsystem/EventSearch" component={EventSearch} />
              {/* qu???n l?? sinh vi??n */}
              <Route
                path="/adminsystem/StudentStatistics"
                component={StudentStaticsContainer}
              />
              <Route
                path="/adminsystem/StudentSearch"
                component={StudentSearchContainer}
              />
              {/* update Club info */}
              <Route
                path="/adminsystem/editClub/:id"
                component={UpdateclubContainer}
              />
              {/* student Cap quyen */}
              <Route
                path="/adminsystem/set-permission/user/:id"
                component={UserDecent}
              />
              {/* update structure club */}
              <Route
                path="/adminsystem/updateStructureImage/Club/:id"
                component={UpdateClubStructureContainer}
              />
              {/* Banner Manage */}
              <Route
                path="/adminsystem/BannerManage"
                component={WebBannerManage}
              />
              {/* t???o staff */}
              <Route
                path="/adminsystem/CreateStaff"
                component={StaffRegister}
              />
              {/* tao banner */}
              <Route
                path="/adminsystem/CreateBanner"
                component={BannerAction}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  userClubs: state.userClubs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClub: () => dispatch(actGetAllClubRequest()),
  getChartClub: () => dispatch(getChartClub()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSystem);
