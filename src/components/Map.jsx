import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useCity } from "../Contexts/CitiesContext";
import { UseGeoLocation } from "../hooks/UseGeoLocation";
import { useUrl } from "../hooks/useUrl";
function Map() {
  const { cities } = useCity();
  const {lat,lng} = useUrl();
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const {
    isLoading: isGeolocationLoading,
    position: geolocationposition,
    getPosition,
  } = UseGeoLocation();
  useEffect(
    function () {
      if (lat && lng) return setmapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(function(){
    if(geolocationposition) setmapPosition([geolocationposition.lat,geolocationposition.lng])
  },[geolocationposition])
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition&&<Button onClick={getPosition} type="position">
        {isGeolocationLoading ? "Loading..." : "Use Your Locarion"}
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
         
          </Marker>
        ))}
           <ChangeMap position={mapPosition} />
           <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      console.log(e);
    },
  });
}
export default Map;
