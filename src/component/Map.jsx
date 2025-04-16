import React, { useState } from "react";
import styles from "./map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const[mapPos, setMapPos] = useState([40, 0]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  function goToForm() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={goToForm}>

      <MapContainer center={mapPos} zoom={13} scrollWheelZoom={true}  className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPos}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
