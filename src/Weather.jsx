import React, { useEffect, useState } from 'react'
import search_icon from '../src/assets/search.png'
import clear_icon from '../src/assets/clear.png'
import cloud_icon from '../src/assets/cloud.png'
import drizzle_icon from '../src/assets/drizzle.png'
import rain_icon from '../src/assets/rain.png'
import snow_icon from '../src/assets/snow.png'
import wind_icon from '../src/assets/wind.png'
import humidity_icon from '../src/assets/humidity.png'
import axios from 'axios'

const Weather = () => {
    const [weather,setWeather] = useState({})
    const [error,setError] = useState('')
    const [city,setCity] = useState('Karachi')
    const [data,setData] = useState([])
    const getWeather = async(city) =>{
        const allIcons= {
            '01d': clear_icon,
            "01n": clear_icon,
            '02d': cloud_icon,
            '02n': cloud_icon,
            '03d': cloud_icon,
            '03n': cloud_icon,
            '04d': drizzle_icon,
            '04n': drizzle_icon,
            '09d': rain_icon,
            '09n': rain_icon,
            '10d': rain_icon,
            '10n': rain_icon,
            '13d': snow_icon,
            '13n': snow_icon,
        }
       
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"baf006be54d61b49b009cdf85a7f80e0"}`)
       setData(response.data)
       console.log(response);
      
       try {
        setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp - 273.15), // Should be converted from Kelvin to Celsius
                location: data.name,
                icon: allIcons[data.weather[0].icon] || clear_icon // Use the icon after data is retrieved
            });
    }
    catch(error){
        setError('City not found. Please try again.');
    }
    }
    const handleClick = () =>{
        getWeather(city)
    }
   function handleInput(e){
       setCity(e.target.value)
   }
   useEffect(()=>{
    getWeather(city)
   },[])
  return (
    <>  
    
     <div className='weather bg-gradient-to-r from-lime-600 max-w-[90%] sm:w-[400px] w-[280px] to-green-700 flex items-center sm:p-[40px] p-[10px] rounded-xl flex-col '>
   <div className="search-bar flex sm:flex items-center gap-3">
    <input onChange={handleInput} className='sm:h-[50px] sm:w-[280px] w-[180px] border-none outline-none rounded-full pl-[20px] mt-5 sm:pl-[25px] text-black text-2xl' type="text" value={city} placeholder='Search' />
    <img className='sm:w-[50px] w-[30px] p-[7px] sm:p-[15px] mt-5 rounded-full cursor-pointer bg-white' src={search_icon} alt="" onClick={handleClick} />
   </div>
   <div className='text-center flex-wrap flex flex-col items-center justify-center'>
    
   <img src={weather.icon || clear_icon} alt="Weather Icon" className='w-[150px] mt-[30px]' />
    <p className='text-white sm:text-7xl text-5xl '>{weather.temperature}°C</p>
    <p className='text-white sm:text-4xl text-2xl mt-2'>{weather.location}</p>
    <div className=''>
        <div className='flex   mt-[60px] gap-[96px]   text-white'>
        <div className='col sm:w-[90px] w-[30px] gap-3 flex items-center'>
            <img className='sm:w-[30px] w-[25px]' src={humidity_icon} alt="" />
            <div>


                <p className='sm:text-2xl text-xl'>{weather.humidity}%</p>
                <span>Humidity</span>


            </div>
        </div>
        <div className='col sm:w-[150px] w-[110px] flex gap-[15px] items-center'>
            <img src={wind_icon} className='sm:w[30px] w-[25px]' alt="" />
            <div>


                <p className='sm:text-2xl text-[15px]'>{weather.windSpeed} Km/h</p>


                <span className='sm:text-xl text-[12px]'>Wind Speed</span>
            </div>
        </div>
        </div>
    </div>
   </div>
   </div>
   </>

  )
}

export default Weather