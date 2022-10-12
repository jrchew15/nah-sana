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
          <div className='splashpageSignupContainer'>
            <NavLink to="/signup" className="splashpageSignup">
              Get Started
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
          <img src="/static/images/splashpageImage.jpg" alt="people working" className='splashpageImage' />
        </div>
      </div>
      {/* Footer */}
      <div className='splashpageFooter'>
        <p className='splashpageFooterText' id='footer'>Like our work? Check us out on Github and LinkedIn and hire us!</p>
        {/* <div className='splashpageProfileContainer'>
          <a href="https://github.com/chencc33" className='splashpageButton' id="spgreen">CC</a>
          <a href="https://github.com/coucode" className='splashpageButton' id="spyellow">CO</a>
          <a href="https://github.com/Fpalacios153" className='splashpageButton' id="spgreen">FP</a>
          <a href="https://github.com/jrchew15" className='splashpageButton' id="spyellow">JC</a>
        </div> */}
        <div className='splashpageProfileContainer'>
          <div className='splashpageButton' id="spgreen">
            <div className='spProfileInitials'>CC</div>
            <div className='splashpageProfileIcons'>
              <a href="https://github.com/chencc33" target="_blank">
                <i className="fa-brands fa-square-github devLinks"></i>
              </a>
              <a href="https://www.linkedin.com/in/chencc33" target="_blank">
                <i className="fa-brands fa-linkedin devLinks"></i>
              </a>
            </div>
          </div>
          <div className='splashpageButton' id="spyellow">
            <div className='spProfileInitials'>CO</div>
            <div className='splashpageProfileIcons'>
              <a href="https://github.com/coucode" target="_blank">
                <i className="fa-brands fa-square-github devLinks"></i>
              </a>
              <a href="https://www.linkedin.com/in/ceciliasou" target="_blank">
                <i className="fa-brands fa-linkedin devLinks"></i>
              </a>
            </div>
          </div>
          <div className='splashpageButton' id="spgreen">
            <div className='spProfileInitials'>FP</div>
            <div className='splashpageProfileIcons'>
              <a href="https://github.com/Fpalacios153" target="_blank">
                <i className="fa-brands fa-square-github devLinks"></i>
              </a>
              {/* <a href="">
                <i className="fa-brands fa-linkedin devLinks"></i>
              </a> */}
            </div>
          </div>
          <div className='splashpageButton' id="spyellow">
            <div className='spProfileInitials'>JC</div>
            <div className='splashpageProfileIcons'>
              <a href="https://github.com/jrchew15" target="_blank">
                <i className="fa-brands fa-square-github devLinks"></i>
              </a>
              <a href="https://www.linkedin.com/in/jason-r-chew/" target="_blank">
                <i className="fa-brands fa-linkedin devLinks"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Splashpage
