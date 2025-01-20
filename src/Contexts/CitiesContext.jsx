import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";

function CitiesProvider({ children }) {
    const [Currentcity,setCurrentcity] = useState({});
  const [cities, setCities] = useState([]);
  const [Loading, setisLoading] = useState(false);
  useEffect(function () {
    async function Loadcities() {
      try {
        setisLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There is a problem on the fetching cities");
      } finally {
        setisLoading(false);
      }
    }
    Loadcities();
  }, []);
 async function getcity (id){
    try {
        setisLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentcity(data);
      } catch {
        alert("There is a problem on the fetching cities");
      } finally {
        setisLoading(false);
      }
 }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        Loading,
        getcity,
        Currentcity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCity() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    return new Error("Context is outside the Provider");
  return context;
}

export { CitiesProvider, useCity };
