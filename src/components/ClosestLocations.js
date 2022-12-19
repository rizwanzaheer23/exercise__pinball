import React from "react";

const ClosestLocations = ({ locations }) => {
  return (

    <div className="locations">
      <h3 style={{ textAlign: "center" }}>{locations && 'Closest Locations'}</h3>
      <div className="locations_wrapper">
        {locations?.map((loc) => (
          <div
            key={loc.id}
            style={{ border: "1px solid black", padding: "5px" }}
          >
            <p>City: {loc?.city}</p>
            <p>Location: {loc?.name}</p>
            <p>Phone: {loc?.phone}</p>
            <p>Address: {loc?.street}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClosestLocations;
