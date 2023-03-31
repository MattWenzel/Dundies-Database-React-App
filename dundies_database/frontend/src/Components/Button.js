const Button = (props) => {
    return (
        <button className="text-blue-700  rounded p-2 border-4 font-bold ml-2 border-blue-700 my-5" onClick={props.submitHandler}>Submit</button>
    )
}

export default Button;