import React from 'react'

function Weather(props) {
    return (
        <div>
                                <li className="tarjeta p-3 mb-2 bg-light text-dark">
                        <div className="row">
                        <div className="col-6">
                        <i className={props.icon}></i>
                        </div>
                        <div className="col-6">
                        <div >{props.weather_description}</div> 
                        <div >Nubosidad: {props.nubosidad}%</div>
                        <div > Visibilidad: {props.visibility}</div>
                        </div>
                        </div>
                    </li>
        </div>
    )
}

export default Weather
