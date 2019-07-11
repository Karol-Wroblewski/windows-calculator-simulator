import React from 'react'
import './style/MemoryButtons.css'

function MemoryButtons(props) {
  return(
    <div className="memory">
      <button disabled={props.memory.length <= 0 || props.decision} onClick={props.deleteAll} title="Clean memory">MC</button>
      <button disabled={props.memory.length <= 0 || props.decision} onClick={props.show}>MR</button>
      <button disabled={props.decision} onClick={props.memory.length > 0 ? props.add.bind(this, 0) : props.save} title="Withdraw from memory">M+</button>
      <button disabled={props.decision} onClick={props.memory.length > 0 ? props.subtract.bind(this, 0) : props.save.bind(this, 1)} title="Add to memory">M-</button>
      <button disabled={props.decision} onClick={props.save} title="Subtract from memory">MS</button>
      <button disabled={props.memory.length <= 0} onClick={props.showMemory}> <p>M <i class="fas fa-sort-down" title="Memory"></i></p></button>
    </div>
  )
}

export default MemoryButtons;