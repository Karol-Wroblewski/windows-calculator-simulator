import React from 'react'
import './style/Screen.css'

class Screen extends React.Component {
  render() {
    return(
      <div onClick={this.props.showMemory} className="screen">
        <div className="top"><p>{this.props.topLine}</p></div>
        <p id="main">
        {this.props.mainScreen}
        </p>
      </div>
    )
  }

}

export default Screen;