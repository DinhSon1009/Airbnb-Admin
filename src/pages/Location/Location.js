import { PublishOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { toast } from "react-toastify";

import "./Location.scss";
import LocationRooms from "../../components/LocationRooms/LocationRooms";
export default function Location() {
  const { locationId } = useParams();
  const [location, setLocation] = useState([]);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const [inputValue, setInputValue] = useState();
  const [formValid, setFormValid] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  useEffect(() => {
    httpServ
      .layThongTinChiTietViTri(locationId)
      .then((res) => {
        setLocation(res.data);
        setInputValue({
          name: res.data.name,
          province: res.data.province,
          country: res.data.country,
          valueate: res.data.valueate,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview.preview);
    };
  });

  const checkValid = () => {
    let valid = true;
    for (let key in errorInput) {
      if (errorInput[key] !== "" || inputValue[key] === "") {
        valid = false;
      }
    }
    setFormValid(valid);
  };

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

  const handleChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    const data = new FormData();
    data.append("location", file);
    setPreview(file);
    setFile(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValid);
    if (formValid) {
      if (file) {
        Promise.all([
          httpServ.capNhatAnhViTri(locationId, file),
          httpServ.capNhatThongTinViTri(locationId, inputValue),
        ])
          .then((res) => {
            toast.success("Cập nhật thành công");
          })
          .catch((err) => toast.error("Xin kiểm tra lại dữ liệu"));
      } else {
        httpServ
          .capNhatThongTinViTri(locationId, inputValue)
          .then((res) => {
            console.log(res);
            toast.success("Cập nhật thành công");
          })
          .catch((err) => toast.error("Xin kiểm tra lại dữ liệu"));
      }
    } else {
      toast.error("Xin kiểm tra lại dữ liệu");
    }
  };

  return (
    <div className="location">
      <div className="titleContainer">
        <h1 className="title">Edit Location</h1>
        <Link to="/newLocation">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div className="container">
        <div className="update">
          <form>
            <div className="updateItem">
              <label htmlFor="name">Location Name</label>
              <input
                onChange={handleInput}
                className="updateInput"
                type="text"
                name="name"
                id="name"
                placeholder={location?.name}
                value={inputValue?.name}
              />
              <div className="text-danger">{errorInput?.name}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="province">Province</label>
              <input
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="province"
                placeholder={location?.province}
                id="province"
                value={inputValue?.province}
              />
              <div className="text-danger">{errorInput?.province}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="country">Country</label>
              <input
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="country"
                placeholder={location?.country}
                id="country"
                value={inputValue?.country}
              />
              <div className="text-danger">{errorInput?.country}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="valueate">Valueate</label>
              <input
                pattern="^\d+$"
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="valueate"
                placeholder={location?.valueate}
                id="valueate"
                value={inputValue?.valueate}
              />
              <div className="text-danger">{errorInput?.valueate}</div>
            </div>
          </form>
          <div className="right">
            <div className="updateUpload">
              <img
                className="updateImg"
                src={preview ? preview.preview : location?.image}
                alt="hinh anh"
              />
              <div>
                <label htmlFor="file">
                  <PublishOutlined style={{ cursor: "pointer" }} />
                </label>
                <input
                  onChange={handleChange}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              style={{ maxWidth: "150px", marginTop: "20px" }}
              type="submit"
              value="Submit"
              className="updateButton"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <LocationRooms locationId={locationId} />
      </div>
    </div>
  );
}
