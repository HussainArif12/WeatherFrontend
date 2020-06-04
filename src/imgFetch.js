import React,{useState} from "react"
import  {useEffect} from "react"
function ImgFetch (props) {
    const [imgSrc, SetImgSrc] = useState('');
    const [width, setWidth] = useState(window.innerWidth)
    const [height,setHeight] = useState(window.innerHeight)
    const [rawSource,setRawSource] = useState('')
    const [isLoading, setIsLoading] = useState(true);
   // let imgSrc2 = 'https://images.unsplash.com/photo-1530908295418-a12e326966ba?&w=' + width + '&h=' + height + '&fit=crop'
    let orientation = '';
    if(height > width) orientation ='portrait';
    else orientation = 'landscape';
    useEffect(()=>{ 
       // fetch('https://api.unsplash.com/photos/random/?client_id=4N9l2Ve0azWHqAX5FdlvGISEW9gHXOmxnIspZVo2BbQ&orientation=' + orientation)
       fetch('https://api.unsplash.com/photos/random/?client_id=4N9l2Ve0azWHqAX5FdlvGISEW9gHXOmxnIspZVo2BbQ&query=' + props.query + '&orientation=' + orientation)
       
      .then(res=> res.json())
        .then(data=>  {
         setRawSource(data.urls.raw );
      data.urls.raw+= "fit=fill&fill=blur" +  "&w=" +width+ "&h="+(height)
        setIsLoading(false)
SetImgSrc(data.urls.raw);
console.log(imgSrc);
    })
   
   // imgSrc2 = imgSrc2Temp + "&w=" + width + "&h=" + height +" &fit=clip";
    
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
   { //setImageBackground('https://picsum.photos/' + width + '/' + height) 
}
  
  { //setImageBackground(imgSrc2) 
  }
  {isLoading? <p>Wait</p> : setImageBackground(imgSrc)}
        </>
    )

}
export default ImgFetch