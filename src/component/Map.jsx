import React, { useContext, useEffect, useState } from "react";
import styles from "./map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { CitiesContext } from "../context/CitiesContext";
export default function Map() {
  const [mapPos, setMapPos] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  const { cities } = useContext(CitiesContext);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPos([mapLat, mapLng]);
      }
    },

    [mapLat, mapLng]
  );
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPos}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((item) => {
          return (
            <Marker
              position={[item.position.lat, item.position.lng]}
              key={item.id}
            >
              <Popup>{item.cityName}</Popup>
            </Marker>
          );
        })}
        <ChangeCenter pos={mapPos} />
        <DetectedEvents />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ pos }) {
  const map = useMap();
  map.setView(pos);
  return;
}
function DetectedEvents() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return;
}
