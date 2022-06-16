import { error } from "console";
import Image from "next/image"
import imageArr from '../assets/images';
import weatherImageObj from '../assets/weatherImages';
import switchWeatherImgArr from '../utils/utils';

interface PropsType{
    tempUnit:string,
    onSearch:(e: React.FormEvent<HTMLFormElement>)=>void;
    error:any
    timezone: string;
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

const Sidebar:React.FC<PropsType>=(props)=>{
   
    let day=new Date().toLocaleString(
        'default', {weekday: 'long'}
    );

    let time=new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let randomNum=Math.floor(Math.random() * 5);
    let randomImg=imageArr[randomNum];
    let weatherImg=switchWeatherImgArr(props.weather[0].main,weatherImageObj);

    return(
        <div className="text-lg lg:w-[22%] md:w-[35%] px-3 py-6 xs:px-6 font-mono flex flex-col justify-between lg:text-xl">
            <h2>Search cities using coords</h2>
            <form onSubmit={(e)=>{e.preventDefault(); props.onSearch(e)}} className="w-full">
                <div className="flex justify-center md:justify-start">
                    <button className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block self-center flex-none" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="flex ">
                        <input id="lat" name="lat" placeholder="Enter latitude" className="text-sm p-2 inline-block w-1/2"/>
                        <input id="long" name="long" placeholder="Enter longitude" className="text-sm p-2 inline-block w-1/2"/>
                    </div>
                    <span>{props.error? props.error:''}</span>
                </div>
            </form>
            
            <div className="flex xs:justify-center sm:justify-start my-4">
                <Image
                src={weatherImg}
                height={135}
                width={135}/>
            </div>
            
            <div className="pb-8 border-b-2 border-slate-100">
                <p className="text-5xl font-light mb-5">{props.temp.toFixed(0)}<span>{props.tempUnit}</span></p>
                <p className="">{day},<span className="text-slate-400 font-light">{time}</span></p>
            </div>
            
            <div className="my-8">
                <div className="font-light flex">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" fill="none" d="M9 14.5954V3.99927C9 2.89967 8.1 2 7 2C5.9 2 5 2.89967 5 3.99927V14.5954C3.5 15.3951 2.7 17.1944 3.1 18.9938C3.4 20.3933 4.6 21.5928 6 21.8927C8.6 22.4925 11 20.4932 11 17.9941C11 16.4947 10.2 15.1952 9 14.5954Z"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" fill="none" d="M7 18.4943C7.27614 18.4943 7.5 18.2705 7.5 17.9943C7.5 17.7182 7.27614 17.4943 7 17.4943C6.72386 17.4943 6.5 17.7182 6.5 17.9943C6.5 18.2705 6.72386 18.4943 7 18.4943Z"></path>
                        <path fill="none" d="M13 7C14.6452 7 16 8.35484 16 10C16 11.6452 14.6452 13 13 13" ></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" d="M13 7C14.6452 7 16 8.35484 16 10C16 11.6452 14.6452 13 13 13"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" d="M13 3.6V2"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" d="M18.7 15.6954L17.6 14.5954"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" d="M17.6 5.39999L18.7 4.29999"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" d="M19.4 9.99707H21"></path></svg>
                    <span>&nbsp;{`Feels like ${props.feels_like.toFixed(0)} ${props.tempUnit}`}</span>
                </div>
                <div className="font-light flex">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
                        <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="1" stroke="#293449" fill="none" d="M18.1 9.7C17.3 7.6 15.2 6 12.7 6C9.5 6 6.9 8.5 6.9 11.7C6.9 11.8 6.9 11.9 6.9 12C6.4 11.7 5.9 11.6 5.3 11.6C3.5 11.5 2 13 2 14.8C2 16.6 3.5 18 5.3 18H17.9C20.2 18 22 16 22 13.8C22 11.6 20.3 9.9 18.1 9.7Z"></path></svg>
                    <span className="">&nbsp;{`Cloudy ${props.clouds}%`}</span>
                </div>
            </div>
            
            <div className="relative my-4 w-64 ">
                <Image
                src={randomImg}
                objectFit="cover"
                objectPosition={'object-center'}
                className='rounded-lg contrast-125 brightness-75'
                height={100}
                width={250}/>
                
                <h2 className="absolute text-center inset-1/3  text-white drop-shadow-sm">{props.timezone}</h2>
            </div>

        </div>
    )
}

export default Sidebar;