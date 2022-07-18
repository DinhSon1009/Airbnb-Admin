import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { toast } from "react-toastify";
import moment from "moment";

const defaultInput = {
  checkOut: moment(new Date()),
  checkIn: moment(new Date()),
  roomId: "",
  userId: "",
};

export default function NewTicket() {
  const [inputValue, setInputValue] = useState(defaultInput);
  const [formValid, setFormValid] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [locations, setLocations] = useState(null);
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  useEffect(() => {
    httpServ
      .layDanhSachViTri()
      .then((res) => {
        setLocations(res.data);
        httpServ
          .layDanhSachPhongChoThueTheoViTri(res.data[0]._id)
          .then((res) => {
            setRooms(res.data);
            setInputValue({ ...inputValue, roomId: res.data[0]._id });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRoomSelection = (id) => {
    httpServ
      .layDanhSachPhongChoThueTheoViTri(id)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.log(err));
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

  const handleInput = (e) => {
    let tagInput = e.target;

    let { name, value } = tagInput;
    let errorMessage = "";
    if (value.trim() === "") {
      errorMessage =
        name[0].toUpperCase() + name.substring(1) + " field is required";
    }
    if (name === "checkIn" || name === "checkOut") {
      value = moment(new Date(value)).format("LLLL");
    }

    let values = { ...inputValue, [name]: value };
    let errors = { ...errorInput, [name]: errorMessage };
    console.log(values);
    setInputValue(values);
    setErrorInput(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValid);
    if (formValid) {
      httpServ
        .taoVe(inputValue)
        .then((res) => {
          console.log(res);
          toast.success("Cập nhật thành công");
        })
        .catch((err) => toast.error("Xin kiểm tra lại dữ liệu"));
    } else {
      toast.error("Xin kiểm tra lại dữ liệu");
    }
  };

  return (
    <div className="location">
      <div className="titleContainer">
        <h1 className="title">New Ticket</h1>
        <Link to="/newTicket">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div className="container">
        <div className="update">
          <form>
            <div className="updateItem">
              <label htmlFor="checkIn">Check In</label>
              <input
                onChange={handleInput}
                className="updateInput"
                type="date"
                name="checkIn"
                id="checkIn"
                value={moment(new Date(inputValue?.checkIn)).format(
                  "YYYY-MM-DD"
                )}
              />
              <div className="text-danger">{errorInput?.checkIn}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="checkOut">Check Out</label>
              <input
                onChange={handleInput}
                className="updateInput"
                type="date"
                name="checkOut"
                id="checkOut"
                value={moment(new Date(inputValue?.checkOut)).format(
                  "YYYY-MM-DD"
                )}
              />
              <div className="text-danger">{errorInput?.checkOut}</div>
            </div>
            <div className="updateItem">
              <label>Room Name</label>
              <select
                name=""
                id=""
                onChange={(e) => handleRoomSelection(e.target.value)}
              >
                {locations?.map((location) => (
                  <option value={location._id}>{location.name}</option>
                ))}
              </select>
            </div>
            <div className="updateItem">
              <label htmlFor="userId">User Id</label>
              <input
                type="text"
                value={inputValue?.userId}
                placeholder="Enter User Id"
                name="userId"
                id="userId"
                onChange={handleInput}
              />
            </div>
            <div className="updateItem">
              <label htmlFor="name">Room Name</label>
              <select name="roomId" id="roomId" onChange={handleInput}>
                {rooms?.map((room) => (
                  <option value={room?._id}>{room.name}</option>
                ))}
              </select>
            </div>

            {/* elavator */}
          </form>
          <div className="right">
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
      <div className="container">{/* <TicketList userId={userId} /> */}</div>
    </div>
  );
}
