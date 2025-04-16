import { createContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState([]);

  // fetch data for cities
  useEffect(function () {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error?.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  //  fech cities detail
  async function fetchCitiesData(id) {
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("hh");
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, fetchCitiesData }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
export { CitiesProvider, CitiesContext };
