import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Airbnb admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <NavLink
              className="navLink"
              to={"/"}
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <p className="title">LISTS</p>

          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
              className="navLink"
              to={"/users"}
            >
              <PersonOutlineOutlinedIcon className="icon" />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
              className="navLink"
              to={"/locations"}
            >
              <LocationOnOutlinedIcon className="icon" />
              <span>Locations</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink"
              to={"/rooms"}
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
            >
              <HomeOutlinedIcon className="icon" />
              <span>Rooms</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
              className="navLink"
              to={"/tickets"}
            >
              <ConfirmationNumberOutlinedIcon className="icon" />
              <span>Tickets</span>
            </NavLink>
          </li>

          {/* <li>
            <MessageOutlinedIcon className="icon" />
            <span>Comments</span>
          </li> */}
          <span className="title">USER</span>
          <li>
            <NavLink
              className="navLink"
              to={"/profile"}
              style={({ isActive }) =>
                isActive ? { backgroundColor: "#ece8ff" } : null
              }
            >
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="logout">
            <LoginOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div> */}
    </div>
  );
}
