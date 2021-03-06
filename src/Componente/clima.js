import React, { Component } from 'react'
import axios from 'axios'; 
import "font-awesome/css/font-awesome.css";
import Sun from './Sun';
import Wind from './Wind';
import Press from './Press';
import Weather from './Weather';
import Tempe from './Tempe';

export class Clima extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareaActual: "",
            text:"buenos aires",
            texto:"",
            nubosidad: "",
            temp: "",
            temp_min: "",
            temp_max: "",   
            sens_term: "",
            pressure: "",
            visibility: "",
            weather: "",
            weather_description: "",
            city: "",
            wind_speed:"",
            icon:"",
            sunrise:"",
            sunset:"",
            wallpaper:"",
            colorText:"",
            classCity:"city",
            tempMM:"",
            tempp:"",
        }
    }


    pedirClima(){
        let ciudad = this.state.tareaActual || this.state.text
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+ciudad+"&appid=c7ef015fd8c3a18683fb069006991c19").then((resp)=>{
            let sunrise = resp.data.sys.sunrise ;
            let sunset = resp.data.sys.sunset ;
            let temp = Math.floor(resp.data.main.temp - 273);
            let temp_min = Math.floor(resp.data.main.temp_min - 273);
            let temp_max = Math.floor(resp.data.main.temp_max - 273);
            let feels_like = Math.floor(resp.data.main.feels_like - 273);
            let visibility = Math.floor(resp.data.visibility / 1000);
            let icon
            let wallpaper
            let weather_description
            let colorText
            let classCity
            let time = new Date().toLocaleTimeString()
            let timev = parseInt(time)
            let tempMM
            let tempp
            console.log(time)
            if (timev >= 19 ){
                classCity="display-4 cityNight"
                tempMM="tempNight col-6"
                tempp=" display-1 temperaturaNight"
                } else {
                    classCity="display-4 city"
                    tempMM="col-6"
                    tempp="display-1 temperatura"
                }
            if (resp.data.weather[0].main==="Thunderstorm"){
                icon = "fa fa-cloud fa-5x"
                weather_description = "Tormenta Electrica"
                if (timev >= 19 ){
                    wallpaper="Thunderstorm"
                    } else {
                    wallpaper="Thunderstorm"
        }
            }
            if (resp.data.weather[0].main==="Drizzle"){
                icon = "fa fa-tint fa-5x"
                weather_description = "Lloviznas"
                if (timev >= 19 ){
                    wallpaper="DrizzleNight"
                    } else {
                    wallpaper="Drizzle"
        }
            }
            if (resp.data.weather[0].main==="Rain"){
                icon = "fa fa-bolt fa-5x"
                weather_description = "Lluvia"
                if (timev >= 19 ){
                    wallpaper="RainNight"
                    } else {
                    wallpaper="Rain"
        }
            }
            if (resp.data.weather[0].main==="Snow"){
                icon = "fa fa-snowflake-o fa-5x"
                weather_description = "Nevando"
                if (timev >= 20 ){
                    wallpaper="Snow"
                    } else {
                    wallpaper="Snow"
        }
            }
            if (resp.data.weather[0].main==="Clouds"){
                icon = "fa fa-cloud fa-5x"
                weather_description = "Parcialmente Nublado"
                if (timev >= 19 ){
                    wallpaper="CloudsNight"
                    } else {
                    wallpaper="Clouds"
        }
            }
            if (resp.data.weather[0].main==="Clear"){
                icon = "fa fa-sun-o fa-5x"
                weather_description = "Cielo Despejado"
                console.log(timev)
                        if (timev >= 19 ){
                        wallpaper="ClearNight"
                        } else {
                        wallpaper="Clear"
            }
            }

            const millisecondsSunr = sunrise * 1000 
            const dateObjectSunr = new Date(millisecondsSunr)
            const humanDateFormatSunr = dateObjectSunr.toLocaleString()

            const millisecondsSun = sunset * 1000 
            const dateObjectSun = new Date(millisecondsSun)
            const humanDateFormatSun = dateObjectSun.toLocaleString()
            

            // let we = new Date().toLocaleTimeString()
            // let wew = we

            this.setState({
                nubosidad : resp.data.clouds.all,
                temp :temp,
                temp_min :temp_min,
                temp_max :temp_max,
                sens_term :feels_like,
                pressure :resp.data.main.pressure,
                visibility: visibility,
                weather: resp.data.weather[0].main,
                weather_description : weather_description,
                city: resp.data.name,
                wind_speed: resp.data.wind.speed,
                icon:icon,
                colorText:colorText,
                wallpaper:wallpaper,
                sunset:humanDateFormatSun,
                sunrise:humanDateFormatSunr,
                classCity:classCity,
                tempMM:tempMM,
                tempp:tempp
            })
        })
    }

    componentDidMount(){  
        this.pedirClima()
    }
    
    inputChange(event){
        this.setState({tareaActual : event.target.value});
        // console.log(event.target.value)
    }

    agregarTarea(){ // Click
        this.setState({
            text: this.state.tareaActual
        })
        this.pedirClima()
    }

    keyPress(event){ //Enter, entra a la lista
        if (event.code === 'Enter'){
            this.agregarTarea()
        }
    }
    
    render() {
        return (
            <div className={this.state.wallpaper} >
                
                <div className="">
                    <input className="form-control "  placeholder="Ingrese nombre de la ciudad..."
                    onChange={this.inputChange.bind(this)}
                    value={this.state.tareaActual}
                    onKeyPress={this.keyPress.bind(this)}
                    ></input>
                    <button className="btn btn-dark btn-block mt-1"
                    onClick={this.agregarTarea.bind(this)}>Buscar clima</button>
                </div>


                <header className=" bg-transparent text-center">
                    <h1 className={this.state.classCity}>{this.state.city}</h1>
                </header>

                <ul className="list-group">
                    
                    <Tempe
                    tempp={this.state.tempp}
                    temp={this.state.temp}
                    tempMM={this.state.tempMM}
                    temp_max={this.state.temp_max}
                    temp_min={this.state.temp_min}
                    />

                    <Weather
                    icon={this.state.icon}
                    weather_description={this.state.weather_description}
                    nubosidad={this.state.nubosidad}
                    visibility={this.state.visibility}
                    />

                    <Press
                    pressure={this.state.pressure} 
                    />

                    <Wind
                    wind_speed={this.state.wind_speed}
                    />
                    
                    <Sun
                    sunrise={this.state.sunrise}
                    sunset={this.state.sunset}
                    />
                </ul>
            </div>
        )
    }
}

export default Clima
