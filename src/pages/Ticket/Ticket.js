import { PublishOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { toast } from "react-toastify";
import moment from "moment";

const defaultInputValue = ["checkIn", "checkOut", "userId", "roomId"];

export default function Ticket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [formValid, setFormValid] = useState(false);
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  useEffect(() => {
    httpServ
      .layThongTinChiTietVe(ticketId)
      .then((res) => {
        setTicket(res.data);

        setInputValue(
          defaultInputValue.reduce(
            (result, key) => ({ ...result, [key]: res.data[key] }),
            {}
          )
        );
      })

      .catch((err) => console.log(err));
  }, []);

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
        .capNhatThongTinVe(ticketId, inputValue)
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
        <h1 className="title">Edit Ticket</h1>
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
                placeholder={moment(new Date(ticket?.checkIn)).format(
                  "yyyy-mm-dd"
                )}
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
                placeholder={moment(new Date(ticket?.checkOut)).format(
                  "yyyy-mm-dd"
                )}
                value={moment(new Date(inputValue?.checkOut)).format(
                  "YYYY-MM-DD"
                )}
              />
              <div className="text-danger">{errorInput?.checkOut}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="name">Room Name</label>
              <input
                className="updateInput"
                type="text"
                name="name"
                id="name"
                value={ticket?.roomId?.name}
              />
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
