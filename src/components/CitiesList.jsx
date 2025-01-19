import styles from './CityList.module.css';
import CityItme from './CityItme';
import Spinner from './Spinner';
function CitiesList({cities,Loading}) {
    if(Loading) return <Spinner/>
    return (
        <ul className={styles.citiesList}>
         {cities.map((city)=><CityItme city={city}/>)}
        </ul>
    )
}

export default CitiesList
