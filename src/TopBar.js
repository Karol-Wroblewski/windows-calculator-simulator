import React from 'react'
import './style/TopBar.css'
function TopBar() {
  return(
    <div className="topBar">
      <p>Calculator</p>
      <section>
        <i className="far fa-window-minimize"></i>
        <i className="far fa-clone"></i>
        <i className="fas fa-times"></i>
      </section>
    </div>
  )

}

export default TopBar;