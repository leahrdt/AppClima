import React from 'react'

function Sun(props) {
    return (
        <div>
                <li className="tarjeta p-3 mb-2 bg-light text-dark">
                    <div className="row">
                        <div className="col-6">
                        <div>Amanecer <i class="fa fa-sun-o" aria-hidden="true"></i></div>
                        <div >{props.sunrise}</div>
                        </div>
                        <div className="col-6">
                        <div>Atardecer <i class="fa fa-moon-o" aria-hidden="true"></i></div>
                        <div >{props.sunset}</div>
                        </div>
                        </div>
                    </li>
        </div>
    )
}

export default Sun
