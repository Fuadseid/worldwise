import styles from './CityList.module.css'
import CityItme from './CityItme';
import Spinner from './Spinner';
import Message from './Message';
import { useCity } from "../Contexts/CitiesContext";

function CitiesList() {
    const {cities,Loading} = useCity();
    if(Loading) return <Spinner/>
    if(!cities.length) return <Message message='Hey there thre is no city selected to add please click on the map'/>
    return (
        <ul className={styles.cityList}>
         {cities.map((city)=><CityItme city={city} key={city.id}/>)}
        </ul>
    )
}

export default CitiesList
