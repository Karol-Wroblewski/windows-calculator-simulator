import React from 'react'
import MemoryValues from '../src/MemoryValues'
import History from '../src/History'
import './style/Buttons.css'

function Buttons(props) {
  return(
  <>
    <div className="buttons">
      <div className="row">
        <button onClick={props.show.bind(this, "%")}>%</button>
        <button onClick={props.show.bind(this, "sqrt")}><i className="icon-math"></i></button>
        <button onClick={props.show.bind(this, "sqr")}> x<sup>2</sup>   </button>
        <button onClick={props.show.bind(this, "reverse")}><sup>1</sup>/x</button>
      </div>
      <div className="row">
        <button onClick={props.show.bind(this, "CE")}>CE</button>
        <button onClick={props.show.bind(this, "C")}>C</button>
        <button onClick={props.show.bind(this, "deleteLast")}><i className="fas fa-backspace"></i></button>
        <button onClick={props.show.bind(this, "divide")}><i className="fas fa-divide"></i></button>
      </div>
      <div className="row">
        <button onClick={props.show.bind(this, "7")}className="bold">7</button>
        <button onClick={props.show.bind(this, "8")} className="bold">8</button>
        <button onClick={props.show.bind(this, "9")} className="bold">9</button>
        <button onClick={props.show.bind(this, "×")} className="bigFont">×</button>  
      </div>
    <div className="row">
      <button onClick={props.show.bind(this, "4")} className="bold">4</button>
      <button onClick={props.show.bind(this, "5")} className="bold">5</button>
      <button onClick={props.show.bind(this, "6")} className="bold">6</button>
      <button onClick={props.show.bind(this, "-")} className="bigFont">-</button>
    </div>
    <div className="row">
      <button onClick={props.show.bind(this, "1")} className="bold">1</button>
      <button onClick={props.show.bind(this, "2")} className="bold">2</button>
      <button onClick={props.show.bind(this, "3")} className="bold">3</button>
      <button onClick={props.show.bind(this, "+")} className="bigFont">+</button>
    </div>
    <div className="row">
      <button onClick={props.show.bind(this, "opposed")}>&#177;</button>
      <button onClick={props.show.bind(this, "0")} className="bold">0</button>
      <button onClick={props.show.bind(this, ",")} className="bigFont">,</button>
      <button onClick={props.show.bind(this, "=")}>=</button>
    </div>
    <MemoryValues decision={props.decision} memory={props.memory} delete={props.delete} add={props.add} subtract={props.subtract}></MemoryValues>
    <History history={props.history}></History>
  </div>
      
  </>
  )
}

export default Buttons;