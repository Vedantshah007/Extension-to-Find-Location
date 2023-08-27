import { useState, useEffect } from "react";
import React = require("react");

require('dotenv').config()

interface State {
  locationCountry: string | null;
  locationCity: string | null;
}

function IndexPopup() {

  const [ipAddress, setIpAddress] = useState("");
  const [loca, setloca] = useState({
    locationCountry: null,
    locationCity: null
  })
  const [onclick, setonclick] = useState(false)

  const apiKey = process.env.PLASMO_PUBLIC_API_KEY

  useEffect(() => {
    if (onclick) {
      fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((json) => {
        setIpAddress(json.ip);
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`)
          .then((res) => res.json())
          .then((json) => {
            setloca({
              locationCountry: json.location.country,
              locationCity: json.location.city,
            });
          })
          .catch((error) => {
            console.error('Error fetching IP address:', error);
          });
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
    }
  }, [onclick]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "500px",
        height: "500px",
        backgroundImage: `url("https://pngimg.com/uploads/world_map/world_map_PNG28.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} onClick={(e) => {
        setonclick(true)
      }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "50%",
        padding: "10px",
        border: "5px solid gray",
        cursor: "pointer"
      }}>
        <span style={{
          textAlign: "center",
          fontWeight: "bolder",
          fontSize: "larger"
        }}>
          {onclick ? (loca.locationCountry ? `Your Country is ${loca.locationCountry} and city is ${loca.locationCity}` : ("Loading...")) : "Show My Location"}
        </span>
      </div>
    </div>
  );
}

export default IndexPopup;