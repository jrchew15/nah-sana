import { NavLink } from 'react-router-dom'
import './Splashpage.css'

function Splashpage() {
  return (
    <div className='signupOuter'>
      {/* Navbar */}
      <div className='splashpageNav'>
        <div className='splashpageLogoContainer'>
          <img src="/static/images/logos/logo-light.png" alt="logo" className='splashpageLogo' />
          <p className='splashpageLogoText'>Nah-sana</p>
        </div>
        <div className='splashpageLoginOuterContainer'>
          <div className='splashpageLoginContainer'>
            <NavLink to="/login" className='splashpageLogin' >
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className='splashpageContent'>
        {/* Left Text */}
        <div className='splashpageContentLeft'>
          <h3 className='splashpageQuote'>"That meeting could've been an email"</h3>
          <div className='splashpageTextDivider'></div>
          <p className='splashpageDescription'>Enter Nah-sana -- manage your projects and tasks effectively so you can get back to sleep...zZzZ</p>
        </div>
        {/* Right Image */}
        <div className='splashpageContentRight'>
          <img src="/static/images/splashpageImage.png" alt="people working" className='splashpageImage' />
        </div>
      </div>
      {/* Footer */}
      <div className='splashpageFooter'>
        <p className='splashpageFooterText' id='footer'>Like our work? Check out our Github profiles and hire us!</p>
        <div className='splashpageProfileContainer'>
          <a href="https://github.com/chencc33" className='splashpageButton' id="spgreen">CC</a>
          <a href="https://github.com/coucode" className='splashpageButton' id="spyellow">CO</a>
          <a href="https://github.com/Fpalacios153" className='splashpageButton' id="spgreen">FP</a>
          <a href="https://github.com/jrchew15" className='splashpageButton' id="spyellow">JC</a>
        </div>
      </div>
    </div>
  )
}
export default Splashpage