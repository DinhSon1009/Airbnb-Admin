import React from "react";

export default function SelectInput({ item, name, event }) {
  const words = name
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return (
    <div className="updateItem">
      <label htmlFor={name}>{words}</label>
      <select
        onChange={event}
        style={{ padding: "5px", width: "200px" }}
        name={name}
        id={name}
        className="updateInput"
      >
        <option selected={item[name] === true} value="true">
          Yes
        </option>
        <option selected={item[name] === false} value="false">
          No
        </option>
      </select>
    </div>
  );
}
