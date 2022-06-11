interface Props{
    class:string,
    title:string,
    selectedValue?:string,
    onClick:(pattern:string)=>void
}

const Button:React.FC<Props>=(props)=>{
    let activeClass=props.selectedValue===props.title? 'text-black underline underline-offset-8':'';


    return(
        <button className={`${props.class} ${activeClass}`} onClick={()=>props.onClick(props.title)}>{props.title}</button>
    )
}

export default Button;