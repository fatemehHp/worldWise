import React, { useContext, useState } from "react";
import styles from "./map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CitiesContext } from "../context/CitiesContext";
export default function Map() {
  const navigate = useNavigate();
  const [mapPos, setMapPos] = useState([40, 0]);
  const { cities } = useContext(CitiesContext);

  function goToForm() {
    navigate("form");
  }
  return (
    <div className={styles.mapContainer} onClick={goToForm}>
      <MapContainer
        center={mapPos}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((item) => {
          return (
            <Marker position={[item.position.lat,item.position.lng]} key={item.id}>
              <Popup>
                {item.cityName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
