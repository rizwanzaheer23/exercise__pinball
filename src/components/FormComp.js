import React from "react";

const FormComp = ({
  handleChange,
  inputLocation,
  getMyLocation,
  showLocations,
}) => {
  return (
    <div className="form_container">
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          name="lat"
          onChange={(event) => handleChange(event)}
          value={inputLocation.lat}
          placeholder="enter latitude"
        />
        <input
          type="number"
          name="lng"
          onChange={(event) => handleChange(event)}
          value={inputLocation.lng}
          placeholder="enter longitude"
        />
        <button onClick={() => getMyLocation()}> Near me </button>
      </div>
      <button onClick={showLocations}>Show Locations</button>
    </div>
  );
};

export default FormComp;
