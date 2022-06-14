import Image from "next/image";
import switchWeatherImgArr from '../utils/utils';
import weatherImageObj from '../assets/weatherImages';

interface Props{
    weather:{ id: number, main: string, description: string, icon:string }[],
    temp: number | {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
    },
    index:number,
    dailyHourlyPattern:string,
    time:Date,
    dt:number,
    tempUnit:string
}

const WeatherCard:React.FC<Props>=(props)=>{

    const getCardDay=(day:number):number=>{
        if(day>=7)
           return day-7;           
        else
           return day;
    }
    
    const determineDay=(time:Date):string=>{
        //Easy way to get the day but since you implemented the other logic i have kept this as a comment
        //return {new Date(props.dt * 1000).toLocaleString('en-US', { weekday: 'short' })}/

        let day=getCardDay(time.getDay()+props.index);
        switch(day){
            case 0:
               return 'Sun'
            case 1:
                return 'Mon'
            case 2:
                return 'Tue'
            case 3:
                return 'Wed'
            case 4:
                return 'Thu'
            case 5:
                return 'Fri'
            case 6:
                return 'Sat'
            default:
                return 'Sun'
        }
    }

    const determineHour=():string=>{

        return (new Date(props.dt * 1000)).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        
        /*let amPmTimeArr=time.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ');
        let hour,format;
        [hour,format]=[...amPmTimeArr]
        
        if(+hour+props.index>=12){
            hour=(+hour+props.index)%12;
            if(+hour===0){
               //props.onTimeFormatChange();
               //console.log(props.timeFormat.current)
            }

            return hour+format;
        }
        else{
            hour=+hour+props.index
            return hour+format
        }*/
    }

    let cardTitle= props.dailyHourlyPattern ==='Today' ? determineHour() : determineDay(props.time);
    let weatherImg=switchWeatherImgArr(props.weather[0].main,weatherImageObj);

    return(
        <div className="h-40 w-40 min-w-[160px] bg-white rounded-[20px] shadow-md flex flex-col py-5 pointer-events-none">
            <h3 className=" mx-auto text-slate-500 mb-2">{cardTitle}</h3>
            <Image
                src={weatherImg}
                objectFit="contain"
                height={70}
                width={50}/>
            <div className="mx-auto">
                {typeof props.temp==="number" ? <span>{props.temp}{props.tempUnit}</span> : <><span>{props.temp.min.toFixed(1)}{props.tempUnit}-</span><span className="text-slate-500">{props.temp.max.toFixed(1)}{props.tempUnit}</span></>}
            </div>
        </div>
    )
}

export default WeatherCard;