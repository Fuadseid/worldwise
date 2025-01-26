import { createContext, useContext, useEffect, useReducer } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";
const intialstate = {
  isLoading: false,
  cities: [],
  Currentcity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loaded":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        Currentcity:action.payload,
      };
    case "city/delete":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
     case "reject":
      return{
        ...state,isLoading:false,error:action.payload,
      } 
     default:
      throw new Error("Unknowen action type")
  }
}
function CitiesProvider({ children }) {

  const [{ isLoading, cities, Currentcity }, dispatch] = useReducer(
    reducer,
    intialstate
  );
  useEffect(function () {
    async function Loadcities() {
      dispatch({ type: "loaded" });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({type:"reject",payload:"There is a problem on the Fetching cities"});
      }
    }
    Loadcities();
  }, []);
  async function getcity(id) {
    if(Number(id)===Currentcity.id) return;
    dispatch({ type: "loaded" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({type:"reject",payload:"There is a problem on the Loading cities"});
    }
  }
  async function CreateCity(newCity) {
    dispatch({ type: "loaded" });

    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        header: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({type:"city/created",payload:data});
    } catch {
      dispatch({type:"reject",payload:"There is a problem on the creating cities"});
    } 
  }
  async function Delatecity(id) {
    dispatch({ type: "loaded" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

dispatch({type:"city/delete",payload:id})    } catch {
  dispatch({type:"reject",payload:"There is a problem on the Deleting cities"});
} 
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getcity,
        Currentcity,
        CreateCity,
        Delatecity,
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
