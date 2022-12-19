import { useState } from "react";
import "./App.css";
import ClosestLocations from "./components/ClosestLocations";
import FormComp from "./components/FormComp";
import { domain } from "./config";
import Loader from "./components/Loader";

function App() {

  const [inputLocation, setInputLocation] = useState({
    lat: "",
    lng: "",
  });
  const [hasLoading,setHasLoading]=useState(false)
  const [locations, setLocations] = useState(null);
  const [hasError, setHasError] = useState("");

  const getLocations = (region) => {
    let url = new URL(`${domain}/region/${region}/locations.json`);
    setHasLoading(true)
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data?.locations);
        setHasLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const showLocations = () => {
    setHasError("");
    setLocations(null);
    if (inputLocation.lat && inputLocation.lng) {
      let url = new URL(`${domain}/regions/closest_by_lat_lon.json$`);
      let params = { lat: inputLocation.lat, lon: inputLocation.lng };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) setHasError(data.errors);
          else getLocations(data.region.name);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("enter latitude and longitude first");
    }
  };

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          setInputLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  };

  const handleChange = (event) =>
    setInputLocation({
      ...inputLocation,
      [event.target.name]: event.target.value,
  });

  return (
    <div className="App">

      <h1>Pinbal near me Locations</h1>
     
      <FormComp
        handleChange={handleChange}
        inputLocation={inputLocation}
        getMyLocation={getMyLocation}
        showLocations={showLocations}
      />
      {hasError && <div>{hasError}</div>}
      <Loader hasLoading={hasLoading} />
      {locations && <ClosestLocations locations={locations} />}
    </div>
  );
}

export default App;
