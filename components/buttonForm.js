import React, { Component } from 'react';

function ButtonForm(props) {
    return (
      <div style={{margin: "10px"}}>
            <form onSubmit={props.action}>
                <label style={{fontWeight: "bold", marginRight: "5px"}}>{props.label}</label>
                <button disabled={props.loading}>{props.text}</button>
            </form>
        </div>
    );
}

export default ButtonForm;