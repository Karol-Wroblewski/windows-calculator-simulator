import React from 'react'

function Value(props){

  return(<li key={props.id}>{props.value} <p> <button className="menuMemory" onClick={props.delete.bind(this, props.id)}>MC</button> <button className="menuMemory" onClick={props.add.bind(this, props.id)}>M+</button> <button className="menuMemory" onClick={props.subtract.bind(this, props.id)}>M-</button> </p></li>);
}


export default Value;