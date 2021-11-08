import React, { useState } from 'react'
import Display from './Display'
import Keypad from './Keypad'

function Calculator() {

    // Initial state of display is 0
    const [result, setResult] = useState("0")

    return (
        <div className="calculator">
            <Display result={result}/>
            <Keypad currResult={result} setResult={setResult}/>
        </div>
    )
}

export default Calculator


