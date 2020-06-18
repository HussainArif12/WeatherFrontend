import React,{useState} from "react"
import  {useEffect} from "react"
import dotenv from "dotenv"
function ImgFetch (props) {
    const [imgSrc, SetImgSrc] = useState('');
    const [width, setWidth] = useState(window.innerWidth)
    const [height,setHeight] = useState(window.innerHeight)
    const [rawSource,setRawSource] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [html,setHTML] = useState('');
    const [authorLink,setAuthorLink] = useState('');
    const [authorName,setAuthorName] = useState('');
    const [imgDescription,setImgDescription] = useState('');
    dotenv.config();
    const key = process.env.REACT_APP_APIIMAGE;
   // let imgSrc2 = 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?&w=' + width + '&h=' + height + '&fit=crop'
    let orientation = '';
    if(height > width) orientation ='portrait';
    else orientation = 'landscape';
    useEffect(()=>{ 
        fetch('https://api.unsplash.com/photos/random/?client_id=' + key  + '&query=' + props.query + '&orientation=' + orientation)
       
      .then(res=> res.json())
        .then(data=>  {
         setRawSource(data.urls.raw );
         console.log(data);
      data.urls.raw+= "fit=fill&fill=blur" +  "&w=" +width+ "&h="+(height)
        setIsLoading(false)
        setHTML(data.links.html);
        setAuthorLink(data.user.links.html+ "?utm_source=HussainsWeatherApp&utm_medium=referral");
        setAuthorName(data.user.name);
        setImgDescription(data.description);
        console.log('image here ' + imgDescription);

SetImgSrc(data.urls.raw);
})
console.log(imgSrc);
   
  },[])
    
    useEffect(()=> {
SetImgSrc(rawSource + "fit=fill&fill=blur" +  "&w=" + width+ "&h="+height);
//imgSrc2 = imgSrc2Temp + "&w=" + width + "&h=" + height;
setImageBackground(imgSrc);
},[height,width]);
    
  function update () {
       setWidth(window.innerWidth)
       setHeight(window.innerHeight)
      };
      function setImageBackground(imgSource) {
          document.getElementById('root').style.backgroundImage ="url(" + imgSource + ")"
          document.getElementById('root').style.backgroundSize = width +"px" + " " + height + "px";
          console.log(imgSource);
      }
    window.addEventListener("resize", update);
    return (
    <>
    {isLoading? <p> Wait</p> : 
      setImageBackground(imgSrc)
      }
  {isLoading? <p>Giving Data:</p> : <footer>Image by <a href={authorLink}> {authorName}</a> on <a href="https://www.unsplash.com?utm_source=HussainsWeatherApp&utm_medium=referral">Unsplash</a> </footer> }
        </>
    )

}
export default ImgFetch