import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import httpServ from "../../services/http.service";
import "./NewUser.scss";

const defaultField = {
  name: "",
  phone: "",
  email: "",
  address: "",
  type: "CLIENT",
  birthday: "",
  password: "",
};
export default function NewUser() {
  const [inputValue, setInputValue] = useState(defaultField);
  const [formValid, setFormValid] = useState(false);
  const [errorInput, setErrorInput] = useState("");

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
    if (name === "address" || name === "password") {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    formValid &&
      httpServ
        .taoTaiKhoan(inputValue)
        .then((res) => {
          console.log(res);
          toast.success("Tạo mới thành công");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Xin kiểm tra lại thông tin");
        });
    !formValid &&
      toast.error("Không thể tạo tài khoản , xin kiểm tra lại thông tin");
  };

  return (
    <div className="newUser">
      <h1 className="title">New User</h1>
      <form className="form">
        <div className="item">
          <label htmlFor="name">Username</label>
          <input
            onChange={handleInput}
            pattern="[0-9]"
            name="name"
            id="name"
            type="text"
            placeholder="Enter Name"
          />
          <div className="text-danger">{errorInput?.name}</div>
        </div>
        <div className="item">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInput}
            name="email"
            id="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            type="email"
            placeholder="Enter Email"
          />
          <div className="text-danger">{errorInput?.email}</div>
        </div>
        <div className="item">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleInput}
            name="password"
            id="password"
            type="password"
            placeholder="Enter Password"
          />
          <div className="text-danger">{errorInput?.password}</div>
        </div>
        <div className="item">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleInput}
            name="phone"
            pattern="^([0-9]{9,15})$"
            id="phone"
            type="text"
            placeholder="Enter Phone Number"
          />
          <div className="text-danger">{errorInput?.phone}</div>
        </div>
        <div className="item">
          <label htmlFor="address">Address</label>
          <input
            name="address"
            id="address"
            onChange={handleInput}
            type="text"
            placeholder="Enter Address"
          />
          <div className="text-danger">{errorInput?.address}</div>
        </div>
        <div className="item">
          <label>Gender</label>
          <div className="gender">
            <input
              defaultChecked
              onChange={handleInput}
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
              value="other"
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            onChange={handleInput}
            className="select"
            name="type"
            id="type"
          >
            <option selected name="type" value="CLIENT">
              CLIENT
            </option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="button">
          Create
        </button>
      </form>
    </div>
  );
}
