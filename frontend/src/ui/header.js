import React from 'react'

const Header = (currName) => {
    let name = currName.currName
  
    return <div>DepMapper
      <a href="https://github.com/aashem/depmapper/"> Git</a>
      <h2>Selected Graph : {name}</h2>
    </div>
  }
  
export default Header