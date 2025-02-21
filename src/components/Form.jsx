// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrl } from "../hooks/useUrl";
import Message from './Message';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Spinner from './Spinner'
import { useCity } from "../Contexts/CitiesContext";
import {  useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
  const { lat, lng } = useUrl();
  const navigate = useNavigate();
  const {CreateCity,Loading} = useCity();
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [Country, setCountry] = useState("");
  const [emoji, SetEmoji] = useState();
  const [isLoadingcode,setIsLoadingcode]= useState(false);
  const[geolocationError, setGeolocationError] = useState('');
  const [countryCode, setCountrycode] = useState();
  useEffect(
    function () {
      async function fetchdata() {
        if(!lat&&!lng) return;
        try {
          setIsLoadingcode(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          SetEmoji(
            convertToEmoji(data.countryCode)
          );
          setCountrycode(countryCode);
          if(!data.countryCode)throw new Error("This is not any country please select country with defind teritory");

        } catch(err) {
          setGeolocationError(err.message);
        }finally{
          setIsLoadingcode(false);
        }
      }
      fetchdata();
    },
    [lat, lng,geolocationError]
  );
 async function handleSubmit(e){
    e.preventDefault();
    if(!cityName||!date) return;
    const newCity ={
cityName,
Country,
emoji,
date,
notes,
position:{lat,lng}
    }
   await CreateCity(newCity);
   navigate('/app/cities')
  }
  if(!lat&&!lng) return <Message message="Pleace click on the map to add city"/> ;

  if(isLoadingcode) return <Spinner/>

  if(geolocationError) return <Message message={geolocationError}></Message>;
  return (
    <form className={`${styles.form} ${Loading?styles.loading:''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

      <DatePicker  id="date" selected={date} onChange={(date) => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
