import React from 'react'

function ElementHistory(props) {
  let top = props.top;
  if(top[top.length - 1] === "+" || top[top.length - 1] === "-" || top[top.length - 1] === "×" || top[top.length - 1] === "/")
    top = top + " " + props.main;
  return(
    <li key={props.id}><p className="operation">{top + " ="}</p>{props.score} </li>
    )
}

export default ElementHistory;