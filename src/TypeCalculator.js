import React from 'react'
import './style/TypeCalculator.css'

function TypeCalculator(props) {
  return(
    <div className="type">
      <i className="fas fa-bars"></i>
      <p>Standard</p>
      <div className="history" onClick={props.showHistory}><i class="fas fa-history"></i></div>
    </div>
  )
}

export default TypeCalculator;