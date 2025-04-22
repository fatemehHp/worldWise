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
      setLoading(true);
      const response = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // send to api
  async function sendCity(city) {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      const data = await res.json();
      setCities((cities) => [...cities, data]);
      setLoading(false);
    } catch (error) {
      console.error("Error sending city:", error.message);
    } finally {
      setLoading(false);
    }
  }
  // delete from api
  async function deleteFromApi(e,id) {
    e.preventDefault()
    await fetch(`http://localhost:8000/cities/${id}`, {
      method: "DELETE",
    });
    const res = await fetch("http://localhost:8000/cities");
    const data = await res.json();

    setCities(data);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        fetchCitiesData,
        sendCity,
        deleteFromApi
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
export { CitiesProvider, CitiesContext };
