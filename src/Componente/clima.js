import React, { Component } from 'react'
import axios from 'axios'; 
import "font-awesome/css/font-awesome.css";

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
            wew:"",
            nose:"",
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

            if (timev >= 19 ){
                classCity="cityNight"
                tempMM="tempNight col-6"
                tempp="temperaturaNight"
                } else {
                    classCity="city"
                    tempMM="col-6"
                    tempp="temperatura"
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

    

    timeDay(){
        // let time = new Date().toLocaleTimeString()
        // let timev = parseInt(time)
        // if (timev < 19 ){
        //     this.setState({
        //         wallpaper:"wallpaper",
        //     })
        // } else {
        //     this.setState({
        //         wallpaper:"aper",
        //     })
        // }
    }

    componentDidMount(){  
        this.pedirClima()
        this.timeDay()
    }
    
    inputChange(event){//metodo
        this.setState({tareaActual : event.target.value});
        // console.log(event.target.value)
    }

    agregarTarea(){ //metodo: Click
        this.setState({
            text: this.state.tareaActual
        })
        this.pedirClima()
    }

    keyPress(event){ //metodo: al apretar enter, entra a la lista
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

                {/* <img style={{height: 1000, width:1000, position: "absolute !important", zIndex: "-222 !important ", backgroundSize:"cover"}}src={wallpaper} ></img> */}
                <header className=" bg-transparent text-center">
                    <h1 className={this.state.classCity}>{this.state.city}</h1>
                </header>

                <ul className="list-group">
                    
                    <li className="bg-transparent p-5 mb-2 bg-light text-dark text-center">
                        <h1 className={this.state.tempp} >{this.state.temp}</h1>
                        <div className="row">
                        <div className={this.state.tempMM}>Max:{this.state.temp_max} °C</div>
                        <div className={this.state.tempMM}>Min:{this.state.temp_min} °C</div>
                        </div>
                    </li>

                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                        <div className="row">
                        <div className="col-6">
                        <i className={this.state.icon}></i>
                        </div>
                        <div className="col-6">
                        <div >{this.state.weather_description}</div> 
                        <div >Nubosidad: {this.state.nubosidad}%</div>
                        <div > Visibilidad: {this.state.visibility}</div>
                        </div>
                        </div>
                    </li>

                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div > Presión</div>
                        </div>
                        <div className="col-6">
                        <div > {this.state.pressure} hPa</div>
                        </div>
                        </div>
                    </li>

                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div className="fa fa-leaf fa-3x"> </div>
                        </div>
                        <div className="col-6">
                        <div > Velocidad del Viento</div>
                        <div >{this.state.wind_speed}km/h</div>
                        </div>
                        </div>
                    </li>

                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div>Amanecer <i class="fa fa-sun-o" aria-hidden="true"></i></div>
                        <div >{this.state.sunrise}</div>
                        </div>
                        <div className="col-6">
                        <div>Atardecer <i class="fa fa-moon-o" aria-hidden="true"></i></div>
                        <div >{this.state.sunset}</div>
                        </div>
                        </div>
                    </li>

                </ul>
            </div>
        )
    }
}

export default Clima
