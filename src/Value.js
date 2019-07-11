import React from 'react'

function Value(props){

  return(<li key={props.id}>{props.value} <p> <button className="menuMemory" onClick={props.delete.bind(this, props.id)} title="delete position from memory">MC</button> <button className="menuMemory" onClick={props.add.bind(this, props.id) } title="Add to this position in memory">M+</button> <button className="menuMemory" onClick={props.subtract.bind(this, props.id)} title="Subtract from this position in memory">M-</button> </p></li>);
}


export default Value;