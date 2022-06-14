export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {day: number, eve: number, max: number, min: number, morn: number, night: number};
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
  
export interface Hourly {
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
  
export interface PropsType{
      lat: number;
      lon: number;
      timezone: string;
      timezone_offset: number;
      current: Current;
      hourly: Hourly[];
      daily: Daily[];
}