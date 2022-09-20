import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginPage.css'

const LoginPage = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemoClick = (e) => {
    e.preventDefault()
    let demoEmail = "demo@demo.io"
    let demoPassword = "pass"

    return dispatch(login(demoEmail, demoPassword)).catch(
      async (res) => {
        const data = await res.json()
        if (data){
          setErrors(data)
        }
      }
    )
  }

  return (
    <div className='loginOuter'>
      <div className='loginInner'>
        <h2 className='loginTitle'>Log in to Nah-sana</h2>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='loginFields'>
            <label htmlFor='email' className='loginLabels'>Email</label>
            <div className='loginInputContainers'>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className='loginInputs'
              />
            </div>

          </div>
          <div className='loginFields'>
            <label htmlFor='password' className='loginLabels'>Password</label>
            <div className='loginInputContainers'>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className='loginInputs'
              />
            </div>

            <button type='submit' className='loginButton'>Login</button>
          </div>
        </form>
        <button type='button' className='loginButton' id='demo' onClick={handleDemoClick}>Sign in as Demo user</button>
        <p className='loginSignup'>Don't have an account?
          <NavLink to="/signup" className='signupLink'>
            Sign Up
          </NavLink>
        </p>
      </div>
      
    </div>

  );
};

export default LoginPage;
