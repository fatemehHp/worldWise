import { createContext, useEffect, useReducer, useState } from "react";
const CitiesContext = createContext();
// initial state
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: [],
};
// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "cities/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "status/loading":
      return { ...state, isLoading: true };
    case "currentCity/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
  }
}
function CitiesProvider({ children }) {
  // useReducer
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // fetch data for cities
  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({ type: "status/loading" });
        const response = await fetch("http://localhost:8000/cities");
        const data = await response.json();
        // data loaded
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log(error?.message || "An unknown error occurred");
      }
    }

    fetchData();
  }, []);
  //  fech cities detail
  async function fetchCitiesData(id) {
    try {
      dispatch({ type: "status/loading" });

      const response = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch (error) {
      console.log(error);
    }
  }
  // send to api
  async function sendCity(city) {
    try {
      dispatch({ type: "status/loading" });
      const res = await fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      // data loaded
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.error("Error sending city:", error.message);
    }
  }
  // delete from api
  async function deleteFromApi(e, id) {
    e.preventDefault();
    await fetch(`http://localhost:8000/cities/${id}`, {
      method: "DELETE",
    });

    // data loaded
    dispatch({ type: "cities/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        fetchCitiesData,
        sendCity,
        deleteFromApi,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
export { CitiesProvider, CitiesContext };
