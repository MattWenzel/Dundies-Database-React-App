import { Component } from "react";

const Input = (props) => {
    const name = props.name;
    return (
        <div>
            <div className="block">{name}</div>
            <input className="border-4 rounded py-2 px-3" value={props.inputData[name]} onChange={(event) => {props.setInputData(
                {...props.inputData,
                [name]: event.target.value})
                }}/>
        </div>
    )
}

export default Input;