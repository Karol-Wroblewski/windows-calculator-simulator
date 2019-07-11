import React from 'react'
import ElementHistory from '../src/ElementHistory'

function History(props) {

  const Items = props.history.map((item, index) => <ElementHistory top={item.up} main={item.main} score={item.score} id={index} key={index} ></ElementHistory>)


  return (<div id="history">
    <ul>
      {Items}
    </ul>
  </div> )
}

export default History;