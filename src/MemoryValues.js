import React from 'react'
import Value from '../src/Value'

function MemoryValues(props){
  
  const Items = props.memory.map((item, index) => <Value value={item} id={index} key={index} delete={props.delete} add={props.add} subtract={props.subtract}></Value>)


  return(<div id="settingsMemory">
    <ul> {Items.length > 0 ? Items : <p className="empty">No elements saved, to continue press the calculator display</p> }  </ul>
    </div>);
}


export default MemoryValues;