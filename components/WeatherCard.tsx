import Image from "next/image";
import {motion} from 'framer-motion';

interface Props{
    weather:{ id: number, main: string, description: string, icon:string }[],
    temp: number | {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number;
        night: number;
    }[],
    index:number,
    dailyHourlyPattern:string,
    time:Date
}

const WeatherCard:React.FC<Props>=(props)=>{

    const getCardDay=(day:number):number=>{
        if(day>=7)
           return day-7;
           
        else
           return day;
        

    }
    
    const determineDay=(time:Date):string=>{
        console.log(time.getDay(),props.index)
        let day=getCardDay(time.getDay()+props.index);
        //console.log(day);
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

    const getCardTime=(time:number):string=>{
        if(time>12){
           time=time-12;
           return time+'PM';
        }
        else{
           return time+'AM';
        }

    }

    const determineHour=(time:Date):string=>{
        switch(props.index){
            case 0:
               return getCardTime(time.getHours())
            case 1:
               return getCardTime(time.getHours() +1)
            case 2:
                return getCardTime(time.getHours() +2)
            case 3:
                return getCardTime(time.getHours() +3)
            case 4:
                return getCardTime(time.getHours() +4)
            case 5:
                return getCardTime(time.getHours() +5)
            case 6:
                return getCardTime(time.getHours() +6)
            default:
                return getCardTime(time.getHours())
        }
    }

    let cardTitle= props.dailyHourlyPattern ==='Today' ? determineHour(props.time) : determineDay(props.time);

    return(
        <motion.div className="h-40 w-40 min-w-[160px] bg-white rounded-[20px] shadow-md flex flex-col py-5 pointer-events-none">
            <h3 className=" mx-auto text-slate-500 mb-2">{cardTitle}</h3>
            <Image
                src='data:image/png;base64,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'
                objectFit="contain"
                height={70}
                width={50}/>
            <div className="mx-auto">
                <span>79-</span><span className="text-slate-500">81^F</span>
            </div>
        </motion.div>
    )
}

export default WeatherCard;