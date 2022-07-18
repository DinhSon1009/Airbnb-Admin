import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import httpServ from "../../services/http.service";
import "./NewLocation.scss";
export default function NewLocation() {
  const [errorInput, setErrorInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    province: "",
    country: "",
    valueate: "",
  });

  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  const handleInput = (e) => {
    let tagInput = e.target;

    let { name, value, pattern } = tagInput;
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage =
        name[0].toUpperCase() + name.substring(1) + " field is required";
    }

    if (name === "valueate") {
      const regex = new RegExp(pattern);
      if (!value.match(regex) || value > 10 || value < 1) {
        errorMessage = "Valuate 1 to 10";
      }
    }

    let values = { ...inputValue, [name]: value };
    let errors = { ...errorInput, [name]: errorMessage };
    console.log(values);
    setInputValue(values);
    setErrorInput(errors);
  };

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
        .taoViTri(inputValue)
        .then((res) => {
          console.log(res);
          toast.success("Tạo mới thành công");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Xin kiểm tra lại thông tin");
        });
    !formValid &&
      toast.error("Không thể tạo vị trí mới , xin kiểm tra lại thông tin");
  };
  return (
    <div className="newLocation">
      <h1 className="title">New Location</h1>
      <form className="form">
        <div className="item">
          <label htmlFor="name">Location Name</label>
          <input
            onChange={handleInput}
            name="name"
            id="name"
            type="text"
            placeholder="Enter Location Name"
            value={inputValue?.name}
          />
          <div className="text-danger">{errorInput?.name}</div>
        </div>
        <div className="item">
          <label htmlFor="province">Province</label>
          <input
            onChange={handleInput}
            name="province"
            id="province"
            type="text"
            placeholder="Enter Location Province"
            value={inputValue?.province}
          />
          <div className="text-danger">{errorInput?.province}</div>
        </div>

        <div className="item">
          <label htmlFor="country">Country</label>
          <input
            name="country"
            id="country"
            onChange={handleInput}
            type="text"
            placeholder="Enter Location Country"
            value={inputValue?.country}
          />
          <div className="text-danger">{errorInput?.country}</div>
        </div>
        <div className="item">
          <label htmlFor="valueate">Valueate</label>
          <input
            pattern="^\d+$"
            onChange={handleInput}
            type="text"
            className="updateInput"
            name="valueate"
            placeholder="Enter Valueate"
            id="valueate"
            value={inputValue?.valueate}
          />
          <div className="text-danger">{errorInput?.valueate}</div>
        </div>
        <button onClick={handleSubmit} className="button">
          Create
        </button>
      </form>
    </div>
  );
}
