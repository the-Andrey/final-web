import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import logo from "../logo192.png"

const Header = (props) => {

  const {navItems} = props

  const navigate = useNavigate();

  return(
    <header>
      <nav className='navbar'>
        <div classname="logotipo-navbar">
        <img src={logo} alt="Logotipo" style={{ width: '4rem', height: '4rem' }} />
        </div>
        <div>
        {navItems ? navItems.map((item) => (
              <Button 
                key={item.name}
                label={item.name}
                onClick={() => navigate(item.url)}
              />
            ))
            : <Button 
                label='Github'
                onClick={() => window.open('https://github.com/the-Andrey', '_blank')}
              />
            }
        </div>
        
      </nav>
    </header>
  )
}

export default Header