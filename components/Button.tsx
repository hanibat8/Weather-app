interface Props{
    class:string,
    title:string,
    selectedValue?:string,
    activeClass:string,
    onClick:(pattern:string)=>void
}

const Button:React.FC<Props>=(props)=>{
    let activeClass=props.selectedValue===props.title? props.activeClass:'';

    return(
        <button className={`${props.class} ${activeClass}`} onClick={()=>props.onClick(props.title)}>{props.title}</button>
    )
}

export default Button;