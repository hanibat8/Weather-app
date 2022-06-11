interface Props{
    title:string,
    svgBg:string,
    svgViewBox:string,
    pathD:string
}

const WeatherHighlightCards:React.FC<Props>=(props)=>{
    let svgClass=`${props.svgBg} self-center w-8 h-8 p-1 mr-2 border-2 rounded-full`
    return(
        <div className="h-36 min-w-96 bg-white rounded-[20px] shadow-md flex flex-col p-5 pointer-events-none">
            <h3 className=" text-slate-500 mb-2">{props.title}</h3>
            <div className="flex my-4">
                <svg className={svgClass} stroke="white" fill="white" strokeWidth="0" viewBox={props.svgViewBox} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d={props.pathD}></path>
                </svg>
                <span className="text-slate-500">81^F</span>
            </div>
    </div>        
    )
}

export default WeatherHighlightCards;
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>