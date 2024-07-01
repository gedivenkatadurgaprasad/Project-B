import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            });
        } else {
            setError("Geolocation not available");
        }
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            axios.get(`http://localhost:3001/weather`, {
                params: {
                    lat: location.lat,
                    lon: location.lon
                }
            })
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
        }
    }, [location]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Weather Forecast</h1>
            <h2>{weatherData.city.name}</h2>
            {weatherData.list.slice(0, 5).map((forecast, index) => (
                <div key={index}>
                    <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                    <p>Temperature: {forecast.main.temp}°C</p>
                    <p>Weather: {forecast.weather[0].description}</p>
                </div>
            ))}
        </div>
    );
}

export default Weather;
