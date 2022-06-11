import type { NextPage } from 'next'
import Head from 'next/head'
import Button from '../components/Button'
import Sidebar from '../components/Sidebar'
import WeatherCard from '../components/WeatherCard'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import WeatherHighlightCards from '../components/WeatherHighlightCards'

interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {day: number, eve: number, max: number, min: number, morn: number, night: number}[];
  feels_like: {day: number, night: number, eve: number, morn: number}[];
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather:  { id: number, main: string, description: string, icon:string }[];
  clouds: number;
  pop: number;
  uvi: number;
}

interface Hourly {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { id: number, main: string, description: string, icon:string }[];
  pop: number;
}

export interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: { id: number, main: string, description: string, icon:string }[] ;
}

interface PropsType{
  weather:{
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    hourly: Hourly[];
    daily: Daily[];
  }
}

const Home: NextPage<PropsType> = (props) => {

  const [width,setWidth]=useState(0);
  const carousal:any=useRef();

  const [dailyWeeklyPattern,setDailyWeeklyPattern]=useState('Week');

  const onPatternBtnClick=(pattern:string)=>{
    setDailyWeeklyPattern(pattern);
  }

  const [tempUnit,setTempUnit]=useState('°C');

  const onTempUnitClick=(unit:string)=>{
    setTempUnit(unit);
  }

  const [time,setTime]=useState(new Date());

  useEffect(()=>{
    setWidth(carousal.current.scrollWidth-carousal.current.offsetWidth);
  },[])

  const determineWeatherCardsArr=()=>{
    if(dailyWeeklyPattern==='Today')
      return props.weather.hourly
    else
      return props.weather.daily
  }

  return (
    <div className='max-w-screen md:flex'>
      
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Weather app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Sidebar {...props.weather.current}/>

      <main className='min-h-screen px-3 py-6 xs:px-6 font-mono bg-slate-100 text-lg lg:w-[78%] md:w-[65%]'>
        
        <div className='py-2 flex justify-between'>  
          <div className=' text-slate-400'>
            <Button selectedValue={dailyWeeklyPattern} class='pr-3 ' title='Today' onClick={onPatternBtnClick}/>
            <Button selectedValue={dailyWeeklyPattern} class='' title='Week' onClick={onPatternBtnClick}/>
          </div>

          <div className=''>
            <Button class='mr-3 p-2 py-1 rounded-full bg-white' title='°C' onClick={onTempUnitClick}/>
            <Button class='p-2 py-1 rounded-full	bg-white' title='°F' onClick={onTempUnitClick}/>
          </div>

          <div className='hidden md:block'>
            <Button selectedValue={dailyWeeklyPattern} class='pr-3' title='Today' onClick={onPatternBtnClick}/>
            <Button selectedValue={dailyWeeklyPattern} class='' title='Week' onClick={onPatternBtnClick}/>
          </div>
        </div>
        
        <motion.div ref={carousal} className='slider cursor-grab overflow-hidden'>          
          <motion.div drag='x'
                      dragConstraints={{right:0, left:-width}}
                      className='inner-slider my-8 flex gap-x-4'>
            {determineWeatherCardsArr().map((el,index)=> <WeatherCard weather={el.weather} temp={el.temp} index={index} dailyHourlyPattern={dailyWeeklyPattern} time={time}/>)}
          </motion.div>
        </motion.div>

        <div className='grid grid-rows-2 grid-cols-gridCol gap-y-6 gap-x-8 '>
            <WeatherHighlightCards title='UV Index' 
                                   svgBg='bg-[#A5881F]'
                                   svgViewBox='0 0 512 512'
                                   pathD='M168.236 12.088l-94.404.004c10.896 8.36 17.928 21.505 17.928 36.3 0 25.262-20.48 45.74-45.74 45.74-15.066 0-28.43-7.287-36.762-18.528v98.755l5.29 41.3 17.313-100.47 26.728 82.066 2.236-67.27 35.838 31.01-12.25-54.86 54.086 28.135-36.762-46.575 53.04-2.56-45.45-22.887 56.268-12.486-47.965-8.153 50.606-29.522zm33.598 6.31l-33.938 17.928 102.02-5.318-105.445 36.53 107.22 23.17-111.36 10.636 109.586 46.105-108.754-14.188 94.57 75.656-90.785-42.2 46.455 75.3-92.21-85.588 56.154 134.648-72.7-94.57 13.004 108.758-42.086-93.037L60.09 338.362l-26.008-136.06-15.727 47.63v106.682L38.22 309.99 58.91 464.26 82.55 289.303l86.296 203.326-24.825-201.552L258.687 437.66l-70.926-172 170.224 127.67L220.86 212.467l189.138 75.656L266.96 175.82l198.6 25.414-184.412-77.427 209.235-29.55-206.28-28.374 113.752-47.485h-196.02z'
            />
            <WeatherHighlightCards title='Wind Status' 
                                   svgBg='bg-[#4D4DF3]'
                                   svgViewBox='0 0 384 512'
                                   pathD='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'
            />
            <WeatherHighlightCards title='Sunrise & Sunset' 
                                   svgBg='bg-[#27A51F]'
                                   svgViewBox='0 0 24 24'
                                   pathD='M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z'
            />
            <WeatherHighlightCards title='Humidity' 
                                   svgBg='bg-[#27A51F]'
                                   svgViewBox='0 0 30 30'
                                   pathD='M7.56,17.19c0-0.88,0.24-1.89,0.72-3.03s1.1-2.25,1.86-3.31c1.56-2.06,2.92-3.62,4.06-4.67l0.75-0.72
                                   c0.25,0.26,0.53,0.5,0.83,0.72c0.41,0.42,1.04,1.11,1.88,2.09s1.57,1.85,2.17,2.65c0.71,1.01,1.32,2.1,1.81,3.25
                                   s0.74,2.16,0.74,3.03c0,1-0.19,1.95-0.58,2.86c-0.39,0.91-0.91,1.7-1.57,2.36c-0.66,0.66-1.45,1.19-2.37,1.58
                                   c-0.92,0.39-1.89,0.59-2.91,0.59c-1,0-1.95-0.19-2.86-0.57c-0.91-0.38-1.7-0.89-2.36-1.55c-0.66-0.65-1.19-1.44-1.58-2.35
                                   S7.56,18.23,7.56,17.19z M9.82,14.26c0,0.83,0.17,1.49,0.52,1.99c0.35,0.49,0.88,0.74,1.59,0.74c0.72,0,1.25-0.25,1.61-0.74
                                   c0.35-0.49,0.53-1.15,0.54-1.99c-0.01-0.84-0.19-1.5-0.54-2c-0.35-0.49-0.89-0.74-1.61-0.74c-0.71,0-1.24,0.25-1.59,0.74
                                   C9.99,12.76,9.82,13.42,9.82,14.26z M11.39,14.26c0-0.15,0-0.27,0-0.35s0.01-0.19,0.02-0.33c0.01-0.14,0.02-0.25,0.05-0.32
                                   s0.05-0.16,0.09-0.24c0.04-0.08,0.09-0.15,0.15-0.18c0.07-0.04,0.14-0.06,0.23-0.06c0.14,0,0.25,0.04,0.33,0.12s0.14,0.21,0.17,0.38
                                   c0.03,0.18,0.05,0.32,0.06,0.45s0.01,0.3,0.01,0.52c0,0.23,0,0.4-0.01,0.52c-0.01,0.12-0.03,0.27-0.06,0.45
                                   c-0.03,0.17-0.09,0.3-0.17,0.38s-0.19,0.12-0.33,0.12c-0.09,0-0.16-0.02-0.23-0.06c-0.07-0.04-0.12-0.1-0.15-0.18
                                   c-0.04-0.08-0.07-0.17-0.09-0.24c-0.02-0.08-0.04-0.19-0.05-0.32c-0.01-0.14-0.02-0.25-0.02-0.32S11.39,14.41,11.39,14.26z
                                    M11.98,22.01h1.32l4.99-10.74h-1.35L11.98,22.01z M16.28,19.02c0.01,0.84,0.2,1.5,0.55,2c0.35,0.49,0.89,0.74,1.6,0.74
                                   c0.72,0,1.25-0.25,1.6-0.74c0.35-0.49,0.52-1.16,0.53-2c-0.01-0.84-0.18-1.5-0.53-1.99c-0.35-0.49-0.88-0.74-1.6-0.74
                                   c-0.71,0-1.25,0.25-1.6,0.74C16.47,17.52,16.29,18.18,16.28,19.02z M17.85,19.02c0-0.23,0-0.4,0.01-0.52
                                   c0.01-0.12,0.03-0.27,0.06-0.45s0.09-0.3,0.17-0.38s0.19-0.12,0.33-0.12c0.09,0,0.17,0.02,0.24,0.06c0.07,0.04,0.12,0.1,0.16,0.19
                                   c0.04,0.09,0.07,0.17,0.1,0.24s0.04,0.18,0.05,0.32l0.01,0.32l0,0.34c0,0.16,0,0.28,0,0.35l-0.01,0.32l-0.05,0.32l-0.1,0.24
                                   l-0.16,0.19l-0.24,0.06c-0.14,0-0.25-0.04-0.33-0.12s-0.14-0.21-0.17-0.38c-0.03-0.18-0.05-0.33-0.06-0.45S17.85,19.25,17.85,19.02z'
            />
            <WeatherHighlightCards title='Pressure' 
                                   svgBg='bg-[#A51F1F]'
                                   svgViewBox='0 0 30 30'
                                   pathD='M7.69,13.2c0-0.99,0.19-1.94,0.58-2.85c0.39-0.91,0.91-1.68,1.57-2.33s1.44-1.17,2.34-1.56c0.9-0.39,1.85-0.58,2.84-0.58
                                   c0.99,0,1.94,0.19,2.85,0.58c0.9,0.39,1.68,0.91,2.33,1.56c0.65,0.65,1.17,1.43,1.56,2.33s0.58,1.85,0.58,2.85
                                   c0,1.62-0.48,3.06-1.44,4.34c-0.96,1.27-2.2,2.14-3.71,2.61v3.29h-4.24v-3.25c-1.54-0.45-2.81-1.32-3.79-2.61S7.69,14.83,7.69,13.2z
                                    M9.3,13.2c0,1.55,0.56,2.88,1.69,3.99c1.11,1.12,2.45,1.68,4.02,1.68c1.03,0,1.99-0.25,2.86-0.76c0.88-0.51,1.57-1.2,2.09-2.07
                                   c0.51-0.87,0.77-1.82,0.77-2.85c0-0.77-0.15-1.5-0.45-2.21s-0.71-1.31-1.22-1.82c-0.51-0.51-1.12-0.92-1.83-1.22
                                   c-0.71-0.3-1.44-0.45-2.21-0.45c-0.77,0-1.5,0.15-2.21,0.45s-1.31,0.71-1.82,1.22c-0.51,0.51-0.92,1.12-1.22,1.82
                                   C9.45,11.7,9.3,12.43,9.3,13.2z M9.88,13.56v-0.72h2.17v0.72H9.88z M10.97,10.02l0.52-0.52l1.52,1.52l-0.52,0.53L10.97,10.02z
                                    M13.5,14.95c0-0.42,0.15-0.78,0.44-1.09c0.29-0.31,0.65-0.47,1.06-0.48l2.73-4.49l0.66,0.35l-2.02,4.83
                                   c0.18,0.25,0.26,0.54,0.26,0.88c0,0.44-0.15,0.81-0.46,1.11c-0.31,0.3-0.68,0.45-1.12,0.45c-0.43,0-0.8-0.15-1.1-0.45
                                   C13.65,15.76,13.5,15.39,13.5,14.95z M14.81,10.28V8.12h0.69v2.17H14.81z M17.75,13.55v-0.74h2.17v0.74H17.75z'
            />
            <WeatherHighlightCards title='Visibility' 
                                   svgBg='bg-[#8A1FA5]'
                                   svgViewBox='0 0 24 24'
                                   pathD='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
            />
        </div>

      </main>
    </div>
  )
}

export default Home

export async function getStaticProps(){
  const res = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=35.68&lon=139.65&exclude=minutely&appid=27902dedefb3fbc3b24431f28cd7ebeb&units=metric')
  const weather = await res.json();

  console.log(weather);

  return{
    props:{
      weather
    }
  }
}

//{determineWeatherCardsArr().map((card)=> <WeatherCard day={card.}/>)}