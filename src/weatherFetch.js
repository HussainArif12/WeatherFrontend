import React,{useEffect,useState} from "react"
 
import ImgFetch from "./imgFetch"
function WeatherFetch (){
    const [main,setMain] = useState('');
    const [time,setTime] = useState('');
    const [temp,setTemp ] = useState('Loading...');
    const [feelsLike,setFeelsLike] = useState('')
    const [icon,setIcon] = useState('');
    const [day,setDay]  = useState('');
    const days= ["Sun","Mon","Tues","Wed","Thurs","Fri","Say"]
    const [description,setDescription] = useState('000');
    const [query,setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://api.openweathermap.org/data/2.5/weather?q=Karachi,pk&APPID=2e236a04f5583031b3357934d5678f1c&units=metric')
        .then(res=> res.json())
        .then(data=> {
            let main = data.weather[0].description;
            setQuery(main);
            console.log(main);
            setMain(data.weather[0].main);

            setDescription(data.weather[0].description);
            setIcon(data.weather[0].icon);
            setTemp(data.main.temp)
            setFeelsLike(data.main.feels_like);
            setLoading(false);
            console.log(data)
        });
    const timerId = setInterval(()=> {
        getTime()
    },1000)    
       return ()=> {
           clearInterval(timerId);
       }
    },[])
    
    function getTime() {
        fetch('http://worldtimeapi.org/api/timezone/Asia/Karachi')
        .then(res=> res.json())
        .then(data=>{
            setTime(data.datetime.substring(11,19));
            setDay(days[data.day_of_week])
        })
    }
    return(
        <div>
        {loading?  <p> please wait </p> : 
        <>
        <ImgFetch query={query}/>
    <header>
    <h1 className='main'>{main}, </h1>
    <h1 className='description'>{description}</h1>
    <img src={" http://openweathermap.org/img/wn/" + icon + "@2x.png"}/>
    </header>
       <main>
    <h1 className='time'>{time} <span className="day"> {day}</span></h1>
  <p className="tempHolder">Real temp:  <span className="tempSpan"> {temp}  °C </span> </p>
  <p className="feelsLikeHolder">Fees like:  <span className="feelsLikeSpan"> {parseInt(feelsLike)}  ° C </span> </p>
    </main> 
    </>
}
</div>
    )
}
export default WeatherFetch;