import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// Define a custom icon
const customIcon = L.icon({
  iconUrl: "/pin.png", // Adjust the URL to the actual path of your icon file
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const createCustomIcon = (iconUrl) => {
  return L.divIcon({
    html: `<div class=" bg-white rounded-full box-content p-[3px] shadow-lg  w-[2.5rem] h-[2.5rem]"   ><img class="  w-[2.5rem] h-[2.5rem] m-auto rounded-full " src=${iconUrl}></img></div>`,
    className: "", // Set className to an empty string to avoid Leaflet default styling
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
  });
};

// ChangeView component to update the map view
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: false });
  }, [center, map]);
  return null;
}

export default function MapComponent() {
  const center = [40.712776, -74.005974]; // Example coordinates (NYC)
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch user locations from the server
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error("Error fetching user locations:", error);
      });
  }, []);

  console.log(locations);
// "bg-white p-5 pt-10"
  return (
    <div style={{ width: "24rem", }}  className='bg-white mt-6   rounded-md  '>
      <h1 className="text-2xl font-medium p-5 pl-2 pb-2  border-b w-[90%] text-gray-500 m-auto">Hometown map</h1>
      <div
        style={{ width: "24rem", height: "300px" }}
        className="  p-7   rounded-[25px] overflow-hidden  h-full"
      >
        <MapContainer
          center={[40.712776, -74.005974]}
          zoom={5}
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: "25px",
            zIndex: "0",
            position: "relative",
          }}
          zoomControl={false}
        >
          <ChangeView center={[40.712776, -74.005974]} />
          <TileLayer
            attribution='&copy; <a href="https://jawg.io/">Jawg Maps</a>'
            url="https://tile.jawg.io/5f65e2d3-137c-47d6-90e6-3c7bbe8f8bff/{z}/{x}/{y}{r}.png?access-token=vpxmqZfPKNmXReJ7ArrixBS7jkAMkfhAHIWKG9DZfHAvZzE0M3aIUr3AwXzrMWz9"
          />
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lon]}
              icon={createCustomIcon(location.profile_img)}
            >
              <Popup>{location.profile_username}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
