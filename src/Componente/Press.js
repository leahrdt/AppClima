import React from 'react'

function Press(props) {
    return (
        <div>
                    <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div > Presión</div>
                        </div>
                        <div className="col-6">
                        <div > {props.pressure} hPa</div>
                        </div>
                        </div>
                    </li>
        </div>
    )
}

export default Press
