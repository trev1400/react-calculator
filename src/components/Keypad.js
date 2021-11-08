import React from 'react'
import Button from './Button'
import {evaluate} from 'mathjs'

function Keypad(props) {

    // Check if expression ends with any of the operators
    const endsWithOperator = () => {
        const ops = ["/", "*", "-", "+"]
        for (const op of ops) {
            if (props.currResult.endsWith(op)) {
                return true
            }
        }
        return false
    }

    // Update the result depending on what button was pressed
    const calculateNewResult = (buttonType, value) => {
        switch(buttonType) {
            // Delete button
            case "deleteButton":
                if (props.currResult.length <= 1) {
                    props.setResult("0")
                } else {
                    props.setResult(props.currResult.substring(0, props.currResult.length - 1))
                }
                break
            case "equalsButton":
                props.setResult(evaluate(props.currResult).toString())
                break
            case "miscButton":
                switch(value) {
                    // Clear button
                    case "C":
                        // Reset result back to 0
                        props.setResult("0")
                        break
                    // Negation button
                    case "+/-":
                        if (props.currResult !== "0") {
                            // Flip sign
                            if (props.currResult.startsWith("-")) {
                                props.setResult(props.currResult.substring(1))
                            } else {
                                props.setResult("-" + props.currResult)
                            }
                        }
                        break
                    // Percentage button
                    case "%":
                        // Multiply by 0.01
                        props.setResult((Number(props.currResult) * 0.01).toString())
                        break
                    default:
                        break
                }
                break
            case "decimalButton":
                // Decimal button, only add if string doesn't already include decimal
                if (!props.currResult.includes(".")) {
                    props.setResult(props.currResult.toString() + ".")
                } 
                break
            case "operatorButton":
                if (!endsWithOperator()) {
                    if (value === "x") {
                        props.setResult(props.currResult.toString() + "*")
                    } else {
                        props.setResult(props.currResult.toString() + value)
                    }
                }
                break
            case "zeroButton":
            case "numberButton":
                if (props.currResult === "0") {
                    props.setResult(value)
                } else {
                    props.setResult(props.currResult.toString() + value)
                }
                break
            default:
                break 
        }
    }

    return (
        <div className="keypad">
            <div className="keypadRow">
                <Button value="C" buttonStyle="miscButton" calculateNewResult={calculateNewResult}/>
                <Button value="+/-" buttonStyle="miscButton" calculateNewResult={calculateNewResult}/>
                <Button value="%" buttonStyle="miscButton" calculateNewResult={calculateNewResult}/>
                <Button value="/" buttonStyle="operatorButton" calculateNewResult={calculateNewResult}/>
            </div>
            <div className="keypadRow">
                <Button value="7" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="8" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="9" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="x" buttonStyle="operatorButton" calculateNewResult={calculateNewResult}/>
            </div>
            <div className="keypadRow">
                <Button value="4" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="5" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="6" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="-" buttonStyle="operatorButton" calculateNewResult={calculateNewResult}/>
            </div>
            <div className="keypadRow">
                <Button value="3" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="2" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="1" buttonStyle="numberButton" calculateNewResult={calculateNewResult}/>
                <Button value="+" buttonStyle="operatorButton" calculateNewResult={calculateNewResult}/>
            </div>
            <div className="keypadRow bottomRow">
                <Button value="0" buttonStyle="zeroButton" calculateNewResult={calculateNewResult}/>
                <Button value="." buttonStyle="decimalButton" calculateNewResult={calculateNewResult}/>
                <Button value="del" buttonStyle="deleteButton" calculateNewResult={calculateNewResult}/>
                <Button value="=" buttonStyle="equalsButton" calculateNewResult={calculateNewResult}/>
            </div>
        </div>
    )
}

export default Keypad
