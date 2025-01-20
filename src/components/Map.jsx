import {  useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
   const navigate = useNavigate()
    const [serchParam,setSearchparm]= useSearchParams();
    const lat = serchParam.get('lat');
    const lng = serchParam.get('lng');
console.log(lat)
    return (
        <div className={styles.mapContainer} onClick={()=>{navigate('form')}}>
            <h1>Map</h1><br />
          <h1>
             Positin: lat= {lat}, lng= {lng}
            </h1>

            <button
            onClick={()=>
                setSearchparm(
                   { lat:15,lng:22}
                )
            }
            >Change Location</button>
        </div>
    )
}

export default Map
