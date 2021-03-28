import React from 'react'

function Tempe(props) {
    return (
        <div>
                    <li className="bg-transparent p-5 mb-2 bg-light text-dark text-center">
                        <h1 className={props.tempp} >{props.temp}</h1>
                        <div className="row">
                        <div className={props.tempMM}>Max:{props.temp_max} °C</div>
                        <div className={props.tempMM}>Min:{props.temp_min} °C</div>
                        </div>
                    </li>
        </div>
    )
}

export default Tempe
