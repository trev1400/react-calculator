import React from 'react'

function Button(props) {
    return (
        <div className={`button ${props.buttonStyle}`} onClick={() => props.calculateNewResult(props.buttonStyle, props.value)}>
            <span>{props.value}</span>
        </div>
    )
}

export default Button

