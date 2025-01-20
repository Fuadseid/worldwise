import styles from "./CountriesList.module.css";
import ContryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../Contexts/CitiesContext";

function CountriesList() {
  const {cities, Loading} = useCity()
  if (Loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Hey there thre is no city selected to add please click on the map" />
    );
  const contries = cities.reduce((arr, cur) => {
    console.log(cur)
    if (!arr.map((el) => el.country).includes(cur.country))
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    else return arr;
  },
[]);

  if (Loading) return <Spinner />;
  if (!cities.length)
    
    return (
      <Message message="Hey there thre is no city selected to add please click on the map" />
    );
  return (
    <ul className={styles.countriesList}>
      {contries.map((country) => (
        <ContryItem country={country} key={country}/>
      ))}
    </ul>
  );
}

export default CountriesList;
