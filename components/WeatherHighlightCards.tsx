interface Props{
    title:string,
    svgBg:string,
    svgViewBox:string,
    pathD:string,
    value:number|string,
    unit?:string
}

const WeatherHighlightCards:React.FC<Props>=(props)=>{
    
    let svgClass=`${props.svgBg} self-center w-8 h-8 p-1 mr-2 border-2 rounded-full`
    
    return(
        <div className="h-36 min-w-96 bg-white rounded-[20px] shadow-md flex flex-col p-5 pointer-events-none lg:h-44">
            <h3 className=" text-slate-500 mb-2">{props.title}</h3>
            <div className="flex my-4 items-baseline">
                <svg className={svgClass} stroke="white" fill="white" strokeWidth="0" viewBox={props.svgViewBox} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d={props.pathD}></path>
                </svg>
                <span className="text-black text-3xl">{props.value}</span>
                <span className="text-black font-thin text-sm">&nbsp;{props.unit}</span>
            </div>
    </div>        
    )
}

export default WeatherHighlightCards;