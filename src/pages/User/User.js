import { Link, useParams } from "react-router-dom";
import UserTicket from "../../components/UserTicket/UserTicket";
import "./User.scss";
import {
  CalendarTodayOutlined,
  LocationSearchingOutlined,
  MailOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import httpServ from "../../services/http.service";
import moment from "moment";
import { toast } from "react-toastify";
export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [update, setUpdate] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "",
    birthday: "",
  });
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    httpServ
      .layThongTinChiTietNguoiDung(userId)
      .then((res) => {
        setUser(res.data);
        setInputValue({
          name: res.data.name,
          phone: res.data.phone,
          email: res.data.email,
          address: res.data.address,
          type: res.data.type,
          gender: res.data.gender,
          birthday: res.data.birthday,
        });
      })
      .catch((err) => console.log(err));
  }, [userId, update]);

  const updateUser = async () => {
    try {
      let res = await httpServ.capNhatNguoiDung(userId, inputValue);
      toast.success("Cập nhật thành công !");
    } catch {
      toast.error("Cập nhật không thành công !");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValid);
    if (formValid) {
      updateUser();
      setUpdate(!update);
    } else {
      toast.error("Cập nhật không thành công !");
    }
  };

  const handleInput = (e) => {
    let tagInput = e.target;

    let { name, value, pattern } = tagInput;
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage =
        name[0].toUpperCase() + name.substring(1) + " field is required";
    }

    if (name === "name") {
      const regex = new RegExp(pattern);
      if (
        regex.test(value) ||
        (value.trim().length <= 5 && value.trim().length >= 1)
      ) {
        errorMessage = "Name is wrong format!";
      }
    }
    if (name === "address") {
      if (value.trim().length <= 10) {
        errorMessage = "Address must be at least 10 letters ";
      }
    }

    if (value !== "" && (name === "phone" || name === "email")) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        if (name === "phone") {
          errorMessage = "Phone must be between 9 and 15 numbers";
        } else {
          errorMessage = "Enter valid email";
        }
      }
    }
    let values = { ...inputValue, [name]: value };
    let errors = { ...errorInput, [name]: errorMessage };
    console.log(values);
    setInputValue(values);
    setErrorInput(errors);
  };
  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  const checkValid = () => {
    let valid = true;
    for (let key in errorInput) {
      if (errorInput[key] !== "" || inputValue[key] === "") {
        valid = false;
      }
    }
    setFormValid(valid);
  };

  return (
    <div className="user">
      <div className="titleContainer">
        <h1 className="title">Edit User</h1>
        <Link to="/newUser">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div className="container">
        <div className="show">
          <div className="showTop">
            <img
              src={
                user?.avatar ||
                "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              }
              alt=""
              className="showImg"
            />
            <div className="showTopTitle">
              <span className="showUsername">{user?.name}</span>
              <span className="showUserTitle">{user?.type}</span>
            </div>
          </div>
          <div className="showBottom">
            <span className="showTitle">Account Details</span>

            <div className="showInfo">
              <CalendarTodayOutlined className="showIcon" />
              <span className="showInfoTitle">
                {moment(user?.birthday).format("DD/MM/YYYY") || "Unknown"}
              </span>
            </div>
            <span className="showTitle">Contact Details</span>
            <div className="showInfo">
              <PhoneAndroidOutlined className="showIcon" />
              <span className="showInfoTitle">+84 {user?.phone}</span>
            </div>
            <div className="showInfo">
              <MailOutlined className="showIcon" />
              <span className="showInfoTitle">{user?.email}</span>
            </div>
            <div className="showInfo">
              <LocationSearchingOutlined className="userShowIcon" />
              <span className="showInfoTitle">
                {user?.address || "UnKnown"}
              </span>
            </div>
          </div>
        </div>
        <div className="update">
          <span className="updateTitle">Edit</span>
          <form className="updateForm">
            <div className="updateLeft">
              <div className="updateItem">
                <label htmlFor="name">Username</label>
                <input
                  onChange={handleInput}
                  name="name"
                  pattern="[0-9]"
                  id="name"
                  type="text"
                  placeholder={user?.name}
                  className="updateInput"
                  value={inputValue.name}
                />
                <div className="text-danger">{errorInput?.name}</div>
              </div>

              <div className="updateItem">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleInput}
                  id="email"
                  name="email"
                  type="text"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  placeholder={user?.email}
                  className="updateInput"
                  value={inputValue.email}
                />
                <div className="text-danger">{errorInput?.email}</div>
              </div>
              <div className="updateItem">
                <label htmlFor="birthday">Birthday</label>
                <input
                  className="updateInput"
                  id="birthday"
                  name="birthday"
                  onChange={handleInput}
                  type="date"
                  style={{ padding: "5px", width: "200px" }}
                  value={moment(new Date(inputValue?.birthday)).format(
                    "YYYY-MM-DD"
                  )}
                />
              </div>
              <div className="updateItem">
                <label htmlFor="phone">Phone</label>
                <input
                  name="phone"
                  id="phone"
                  onChange={handleInput}
                  pattern="^([0-9]{9,15})$"
                  type="text"
                  placeholder={`+84 ${user?.phone}`}
                  className="updateInput"
                  value={inputValue.phone}
                />
                <div className="text-danger">{errorInput?.phone}</div>
              </div>
              <div className="updateItem">
                <label htmlFor="address">Address</label>
                <input
                  onChange={handleInput}
                  name="address"
                  id="address"
                  type="text"
                  placeholder={user?.address || "Unknown"}
                  className="updateInput"
                  value={inputValue.address}
                />
                <div className="text-danger">{errorInput?.address}</div>
              </div>
              <div className="updateItem">
                <label htmlFor="type">Type</label>
                <select
                  onChange={handleInput}
                  style={{ padding: "5px", width: "200px" }}
                  name="type"
                  id="type"
                  className="updateInput"
                >
                  <option selected={user?.type === "CLIENT"} value="CLIENT">
                    Client
                  </option>
                  <option selected={user?.type === "ADMIN"} value="ADMIN">
                    Admin
                  </option>
                </select>
              </div>
              <div className="updateItem">
                <label>Gender</label>
                <div className="gender">
                  <input
                    onChange={handleInput}
                    defaultChecked
                    type="radio"
                    name="gender"
                    id="male"
                    value="true"
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    onChange={handleInput}
                    type="radio"
                    name="gender"
                    id="female"
                    value="false"
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    onChange={handleInput}
                    type="radio"
                    name="gender"
                    id="other"
                    value="null"
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            <div className="updateRight">
              <div className="updateUpload">
                <img
                  className="updateImg"
                  src={
                    user?.avatar ||
                    "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  }
                  alt=""
                />
                {/* <label htmlFor="file">
                  <PublishOutlined className="updateIcon" />
                </label>
                <input
                  onChange={handleAvatarChange}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                /> */}
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                value="Submit"
                className="updateButton"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <UserTicket userId={userId} />
      </div>
    </div>
  );
}
