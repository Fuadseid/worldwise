import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCity } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function CityItme({ city }) {
  const {Currentcity,Delatecity} =useCity()
  const { cityName, emoji, date,id,position } = city;
  function handleclick(e){
    e.preventDefault();
      console.log("test")
      Delatecity(id);
    }
  return (
    
    
    
 
    <li >
        <Link className={`${styles.cityItem} ${id===Currentcity.id?styles['cityItem--active']:''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
   <button onClick={handleclick} className={styles.deleteBtn} >&times;</button>
      {console.log(city)}
      </Link>
    </li>
  );
}

export default CityItme;
