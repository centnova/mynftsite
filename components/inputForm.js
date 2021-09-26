import React, { Component, useState }  from "react";

function InputForm(props) {

    let [inputValue, setInputValue] = useState("");

    let handleInputChange = async (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    return(
        <div style={{margin: "10px"}}>
            <form onSubmit={(e) => props.action(e, inputValue)}>
                <label style={{fontWeight: "bold", marginRight: "5px"}}>{props.label}</label>
                <input type="text" value={inputValue} onChange={handleInputChange}/>
                <button disabled={props.loading}>{props.text}</button>
            </form>
        </div>
    );
}

export default InputForm;