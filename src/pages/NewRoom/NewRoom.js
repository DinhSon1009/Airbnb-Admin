import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectInput from "../../components/SelectInput/SelectInput";
import httpServ from "../../services/http.service";
import "./NewRoom.scss";
const defaultInputValue = {
  name: "",
  guests: "",
  bedRoom: "",
  bath: "",
  description: "",
  price: "",
  elevator: false,
  hotTub: false,
  pool: false,
  indoorFireplace: false,
  dryer: false,
  gym: false,
  kitchen: false,
  wifi: false,
  heating: false,
  cableTV: false,
  locationId: "",
};
export default function NewRoom() {
  const [errorInput, setErrorInput] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [locations, setLocations] = useState();

  useEffect(() => {
    checkValid();
  }, [inputValue, errorInput]);

  useEffect(() => {
    httpServ.layDanhSachViTri().then((res) => {
      setLocations(res.data);
      setInputValue({ ...inputValue, locationId: res.data[0]._id });
    });
  }, []);

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
        .taoPhongChoThue(inputValue)
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
    <div className="newRoom">
      <h1 className="title">New Room</h1>
      <div className="update">
        <form className="form">
          <div className="updateItem">
            <label htmlFor="name">Room Name</label>
            <input
              onChange={handleInput}
              className="updateInput"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Room Name"
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
              placeholder="Enter Guests"
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
              placeholder="Enter Bedrooms"
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
              placeholder="Enter bath"
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
              placeholder="Enter description"
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
              placeholder="Enter price"
              id="price"
              value={inputValue?.price}
            />
            <div className="text-danger">{errorInput?.price}</div>
          </div>
          <div className="updateItem">
            <label htmlFor="locationId">Location</label>
            <select
              onChange={handleInput}
              style={{ padding: "5px", width: "200px" }}
              name="locationId"
              id="locationId"
              className="updateInput"
            >
              {locations?.map((location) => (
                <option value={location._id} name="locationId" id="locationId">
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {/* elavator */}

          <SelectInput item={inputValue} name="elevator" event={handleInput} />
          <SelectInput item={inputValue} name="hotTub" event={handleInput} />
          <SelectInput item={inputValue} name="pool" event={handleInput} />
          <SelectInput
            item={inputValue}
            name="indoorFireplace"
            event={handleInput}
          />
          <SelectInput item={inputValue} name="dryer" event={handleInput} />
          <SelectInput item={inputValue} name="gym" event={handleInput} />
          <SelectInput item={inputValue} name="kitchen" event={handleInput} />
          <SelectInput item={inputValue} name="wifi" event={handleInput} />
          <SelectInput item={inputValue} name="heating" event={handleInput} />
          <SelectInput item={inputValue} name="cableTV" event={handleInput} />
          <button onClick={handleSubmit} className="button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
