import React, { Component } from 'react';

function Card(props) {

    const container = {
        width: "50%",
        minWidth: "30%",
        padding: "2px 16px",
        border: "1px",
        borderStyle: "solid",
        float: "left",
        height: "100px",
        overflow: "hidden"
    }

    const h4 = {
        marginBottom: "-10px"
    }

    return(
        <div style={container}>
                <h4 style={h4}>{props.title}: {props.value}{props.units && <span> {props.units}</span>}</h4>
                <p>{props.description}</p>
        </div>
    );
}

export default Card;
