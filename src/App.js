import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { motion } from 'framer-motion';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [tempInCelsius, setTempInCelsius] = useState(null);
  const [hover, setHover] = useState(false);

  const apiKey = 'bb6b853a2e4bb781e08e39c60f15df3b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setTempInCelsius(response.data.main.temp);
      console.log(response.data);
      setLocation('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert("City: " + location + " not found");
    }
  };

  const handleClick = (e) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const emojus = () => {
    const weather = data.weather ? data.weather[0].description.toLowerCase() : '';
    if (weather.includes('clear')) return '☀️';
    if (weather.includes('clouds')) return '☁️';
    if (weather.includes('rain')) return '🌧️';
    if (weather.includes('snow')) return '❄️';
    if (weather.includes('drizzle')) return '🌧️';
    if (weather.includes('mist')) return '🌫️';
    if (weather.includes('haze')) return '💨';
    return '🌍';
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <div className="App">
      
      <div className='in'>
        <motion.input
          type="text"
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleClick}
          placeholder="Enter Location"
          whileTap={{ scale: 1 }}
          whileFocus={{ scale: 1.02, backgroundColor: 'rgba(46, 45, 45, 1)' }}
          whileHover={{ scale: 1.2, marginRight: '12px' }}
        />
        <motion.button onClick={searchLocation} className='search-btn' whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
      <div className="container">
        <div className="top">
          <div className="date-time">
            <p>Date: {dateTime.toLocaleDateString()} </p>
            <p>Time: {dateTime.toLocaleTimeString()}</p>
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div 
            className="temp" 
            onMouseEnter={() => setHover(true) } 
            onMouseLeave={() => setHover(false)}
            // onTransition={{'2s'}}
          >
            {data.main ? (
              <h1>{hover ? convertToFahrenheit(tempInCelsius).toFixed(2) + '°F' : tempInCelsius + '°C'}</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description} {emojus()} </p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels s">
            {data.main ? <p>Feels</p> : null}
            {data.main ? <p>{data.main.feels_like}°C</p> : null}
          </div>
          <div className="humidity s">
            {data.main ? <p>Humidity</p> : null}
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className="wind s">
            {data.main ? <p>Wind</p> : null}
            {data.wind ? <p>{data.wind.speed} m/s</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
