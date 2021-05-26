export default function Main(){
    const apiKey ="016f60e8b4074404837101157211504";
    let getData=()=>{
        let location = document.getElementById("location").value;
       
        fetch("https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+location+"&aqi=yes")
        .then((response)=> {
            return response.json()
        })
        .then((content)=>{
            if(!content.error){
                let locationHeading = content.location.name +", "+content.location.country;
                let temperature = content.current.temp_c;
                let weather = content.current.condition.icon;
                let airIndex = (Math.round(content.current.air_quality.co) + Math.round(content.current.air_quality.no2) + Math.round(content.current.air_quality.o3) 
                    + Math.round(content.current.air_quality.pm2_5) +  Math.round(content.current.air_quality.pm10 + content.current.air_quality.so2))/6;
                document.querySelector(".city-heading").innerText = locationHeading;
                document.querySelector(".temperature").innerText = "Temperature: " +temperature +" "+ String.fromCharCode(8451);
                let emoji = airIndex<=50? "😁": airIndex <= 100? "😊" : airIndex <= 150? "😐" : airIndex <= 200? "😷" : airIndex <=300? "🤢" : "💀";   
                document.querySelector(".air-index").innerText = "Air Quality Index: "+ airIndex.toFixed(2) +" " +emoji;
                document.getElementById("weatherImg").src = weather;
                document.querySelector(".weather-container").classList.remove("none");
            }
            else{
                document.querySelector(".city-heading").innerText = content.error.message;
                document.querySelector(".temperature").innerText = "";
                document.querySelector(".air-index").innerText = "";
                document.getElementById("weatherImg").src = "";
                document.querySelector(".weather-container").classList.remove("none");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className="container">
            <h1>Weather and Polution Info</h1>
            <p> Location: <input type="text" name="location" id="location" placeholder="City" /></p>
            <button class="btn" onClick={()=>getData()} >Get Info</button>
            <div className="weather-container none">
                <h1 className="city-heading"> </h1>
                <div className="temperature-container"><h2 className="temperature"> </h2><img src="" id="weatherImg" alt="weatherPicture"/></div>
                <h2 className="air-index"> </h2>
            </div>
     </div>

    )
}