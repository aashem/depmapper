import React from 'react'
import gitlogo from '../assets/githublogo.svg'

const Header = () => {

  const logoStyle = {
    height: '20px',
    width: '20px'
  }
  
  
    return <div>
      DepMapper
      <a href="https://github.com/aashem/depmapper/" >
        <img src={gitlogo} alt = "logo" style={logoStyle} 
        >  
        </img>
        </a>

    </div>
  }
  
export default Header