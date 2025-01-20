import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker,Popup, useMap } from 'react-leaflet'
import { useEffect, useState } from "react";
import { useCity } from "../Contexts/CitiesContext";
function Map() {
    const {cities} = useCity();
  const navigate = useNavigate();
  const [serchParam, setSearchparm] = useSearchParams();
  const lat = serchParam.get("lat");
  const lng = serchParam.get("lng");
  const [mapPosition, setmapPosition] = useState([40,0]);
  useEffect(function(){
  if(lat&&lng) return  setmapPosition([lat,lng]);
  },[lat,lng])
  return (
    <div
      className={styles.mapContainer}
    
    >
     <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
     {cities.map((city)=>(
        <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
      <ChangeMap position={mapPosition}/>
    </Marker>
     ))}  
  </MapContainer>
    </div>
  );
}
  function ChangeMap({position}){
    const map =useMap();
    map.setView(position);
    return null;
  }
export default Map;
