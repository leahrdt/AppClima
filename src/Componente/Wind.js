import React from 'react'

function Wind(props) {
    return (
        <div>
                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div className="fa fa-leaf fa-3x"> </div>
                        </div>
                        <div className="col-6">
                        <div > Velocidad del Viento</div>
                        <div >{props.wind_speed}km/h</div>
                        </div>
                        </div>
                    </li>
        </div>
    )
}

export default Wind
