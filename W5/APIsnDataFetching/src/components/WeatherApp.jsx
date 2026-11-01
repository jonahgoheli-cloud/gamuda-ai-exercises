import { useEffect, useState } from "react";

function WeatherApp() {
    const [weather, setWeather] = useState(null);

    const url = "https://open-meteo.com";

    useEffect(() => {
        async function fetchWeather() {
            try {
                const url ="https://api.open-meteo.com/v1/forecast?latitude=5.9804&longitude=116.0735&current=temperature_2m,rain,wind_speed_10m";
            const response = await fetch(url);
            const data = await response.json();

            setWeather(data.current);

            const temp = data.current.temperature_2m;
            const rain = data.current.rain;

            console.log(
                `Current Temperature: ${temp}°C, Rain: ${rain}mm`
            );

            if (rain > 0) {
                console.log("Bring an umbrella! It is raining.");
            } else if (temp > 30) {
                console.log("It's a hot day!");
            } else {
                console.log("The weather is clear and mild.")
            }
            } catch (error) {
                console.log("Error fetching weather:", error);
            }
        }

        fetchWeather();
    }, []);

    if (!weather) {
        return <p>Loading weather...</p>;
    }

    return (
        <div>
            <h2>Current Weather</h2>
            <p>Temperature: {weather.temperature_2m}°C</p>
            <p>Rain: {weather.rain} mm</p>
            <p>Windspeed: {weather.wind_speed_10m} km/h</p>
        </div>
    );      
      }

        export default WeatherApp;