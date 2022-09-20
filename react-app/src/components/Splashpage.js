import { NavLink } from 'react-router-dom'

function Splashpage() {

  return (
    <div>
      <h1>Welcome to Nah-sana!</h1>
      <NavLink to="/login">Log In</NavLink>
    </div>
  )
}
export default Splashpage