import { PublishOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import httpServ from "../../services/http.service";
import { toast } from "react-toastify";
import SelectInput from "../../components/SelectInput/SelectInput";

const defaultInputValue = [
  "name",
  "guests",
  "bedRoom",
  "bath",
  "description",
  "price",
  "elevator",
  "hotTub",
  "pool",
  "indoorFireplace",
  "dryer",
  "gym",
  "kitchen",
  "wifi",
  "heating",
  "cableTV",
];

export default function Rooms() {
  const { roomId, locationId } = useParams();
  const [room, setRoom] = useState([]);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const [inputValue, setInputValue] = useState();
  const [formValid, setFormValid] = useState(false);
  const [errorInput, setErrorInput] = useState("");
  const [locations, setLocations] = useState();

  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  useEffect(() => {
    httpServ
      .layThongTinChiTietPhongChoThue(roomId)
      .then((res) => {
        setRoom(res.data);
        setInputValue(
          defaultInputValue.reduce(
            (result, key) => ({
              ...result,
              [key]: res.data[key],
              locationId: locationId,
            }),
            {}
          )
        );
      })

      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    httpServ
      .layDanhSachViTri()
      .then((res) => {
        setLocations(res.data);
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

  const handleChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    const data = new FormData();
    data.append("room", file);
    setPreview(file);
    setFile(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValid);
    if (formValid) {
      if (file) {
        Promise.all([
          httpServ.capNhatHinhAnhPhongChoThue(roomId, file),
          httpServ.capNhatThongTinPhongChoThue(roomId, inputValue),
        ])
          .then((res) => {
            toast.success("Cập nhật thành công");
          })
          .catch((err) => toast.error("Xin kiểm tra lại dữ liệu"));
      } else {
        httpServ
          .capNhatThongTinPhongChoThue(roomId, inputValue)
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
        <h1 className="title">Edit Room</h1>
        <Link to="/newRoom">
          <button className="addButton">Create</button>
        </Link>
      </div>
      <div className="container">
        <div className="update">
          <form>
            <div className="updateItem">
              <label htmlFor="name">Room Name</label>
              <input
                onChange={handleInput}
                className="updateInput"
                type="text"
                name="name"
                id="name"
                placeholder={room?.name}
                value={inputValue?.name}
              />
              <div className="text-danger">{errorInput?.name}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="guests">Guests</label>
              <input
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="guests"
                placeholder={room?.guests}
                id="guests"
                value={inputValue?.guests}
              />
              <div className="text-danger">{errorInput?.guests}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="bedRoom">Bed Room</label>
              <input
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="bedRoom"
                placeholder={room?.bedRoom}
                id="bedRoom"
                value={inputValue?.bedRoom}
              />
              <div className="text-danger">{errorInput?.bedRoom}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="bath">Bath</label>
              <input
                pattern="^\d+$"
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="bath"
                placeholder={room?.bath}
                id="bath"
                value={inputValue?.bath}
              />
              <div className="text-danger">{errorInput?.bath}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="description">Description</label>
              <input
                pattern="^\d+$"
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="description"
                placeholder={room?.description}
                id="description"
                value={inputValue?.description}
              />
              <div className="text-danger">{errorInput?.description}</div>
            </div>
            <div className="updateItem">
              <label htmlFor="price">Price</label>
              <input
                pattern="^\d+$"
                onChange={handleInput}
                type="text"
                className="updateInput"
                name="price"
                placeholder={room?.price}
                id="price"
                value={inputValue?.price}
              />
              <div className="text-danger">{errorInput?.price}</div>
            </div>

            {/* elavator */}

            <SelectInput item={room} name="elevator" event={handleInput} />
            <SelectInput item={room} name="hotTub" event={handleInput} />
            <SelectInput item={room} name="pool" event={handleInput} />
            <SelectInput
              item={room}
              name="indoorFireplace"
              event={handleInput}
            />
            <SelectInput item={room} name="dryer" event={handleInput} />
            <SelectInput item={room} name="gym" event={handleInput} />
            <SelectInput item={room} name="kitchen" event={handleInput} />
            <SelectInput item={room} name="wifi" event={handleInput} />
            <SelectInput item={room} name="heating" event={handleInput} />
            <SelectInput item={room} name="cableTV" event={handleInput} />
            <div className="updateItem">
              <label>Room Name</label>
              <select
                name=""
                id=""
                onChange={(e) =>
                  setInputValue({ ...inputValue, locationId: e.target.value })
                }
              >
                <option>Select</option>
                {locations?.map((location) => (
                  <option value={location._id}>{location.name}</option>
                ))}
              </select>
            </div>
          </form>
          <div className="right">
            <div className="updateUpload">
              <img
                className="updateImg"
                src={preview ? preview.preview : room?.image}
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
      <div className="container">{/* <TicketList userId={userId} /> */}</div>
    </div>
  );
}
