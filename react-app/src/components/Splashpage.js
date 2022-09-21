import { NavLink } from 'react-router-dom'
import './Splashpage.css'

function Splashpage() {
  return (
    <div className='signupOuter'>
      <div className='splashpageNav'>
        <p>Nah-sana</p>
        <div className='splashpageLoginContainer'>
          <NavLink to="/login" className='splashpageLogin' >
            <i className="fa-solid fa-user"></i>
          </NavLink>

        </div>
      </div>

    </div>
  )
}
export default Splashpage