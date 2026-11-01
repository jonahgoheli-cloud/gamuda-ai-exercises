import { useState } from "react";

function WeatherDashboard() {
    const [weather, setWeather] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState('false');
    const [error, setError] = useState('');
    const [temperature, setTemperature] = useState(null);

    const handleSelect = (condition) => {
        setIsLoading(true);
        setError('');
        setTimeout(() => {
            if (condition === '') {
                setError('Please select a location');
                setIsLoading(false);
                return;
            }

            setWeather(condition);
            setTemperature(Math.floor(Math.random() * 35));
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div>
            <h2>Weather Dashboard</h2>
            <select onChange={(e) => handleSelect(e.target.value)}>
                <option value="">-- Select Location --</option>
                <option value="sunny">-- Melaka --</option>
                <option value="rainy">-- Sabah --</option>
                <option value="cloudy">-- Sarawak --</option>
            </select>

            {isLoading && <p>Loading weather...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!isLoading && weather && (
                <div>
                    <p>Weather: {weather}</p>
                    <p style={{ color: temperature > 30 ? 'red' : 'blue' }}>
                        Temperature: {temperature}°C
                    </p>
                    <button onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? 'Hide Forecast' : 'Show Forecast'}
                    </button>
                    {showDetails && <p>Detailed Forecast: It might change later.</p>}
                </div>
            )}
        </div>
        );
    }

    export default WeatherDashboard;