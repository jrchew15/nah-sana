import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpPage.css'

const SignUpPage = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const image = `/static/images/users/${Math.ceil(Math.random() * 5)}.png`

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(email, password, firstName, lastName, role, image, pronouns, department, bio));
      if (data) {
        setErrors(data)
      }
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }
  function passwordCheck() {
    if (password !== repeatPassword) {
      return (
        <div className='errorText'>
          Passwords must match
        </div>
      )
    }
  }

  return (
    <div className='signupOuter'>
      <div className='signupNav'>
        <div className='signupLogoContainer'>
          <a href="/" className='signupLogoContainer'>
            <img src="/static/images/logos/logo-light.png" alt="logo" className='signupLogo' />
            <p className='signupLogoText'>Nah-sana</p>

          </a>
        </div>

      </div>
      <div className='signupContent'>
        <div className='signupContentLeft'>
          <p className='signupHeader'>Sign up</p>
          <p className='signupSubheader'> By signing up, I agree to the Nah-sana Privacy Policy and Terms of Service</p>
          
          <form onSubmit={onSignUp} className='signupForm'>
            {errors.length > 0 && (<div className='errorContainer'>
              {errors.map((error, ind) => (
                <div key={ind} className='errorText'>{error.split(":")[1]}</div>
              ))}
            </div>)}
            {
              passwordCheck()
            }
            <div className="signupOuterInput">
              <input
                type='text'
                name='firstName'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="signupInput"
                placeholder='First Name'
              ></input>
            </div>
            <div className="signupOuterInput">
              <input
                type='text'
                name='lastName'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                id="signupInput"
                placeholder='Last Name'
              ></input>
            </div>
            <div className="signupOuterInput">
              <input
                type='text'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="signupInput"
                placeholder='name@company.com'
              ></input>
            </div>
            <div className="signupOuterInput">
              <input
                type='text'
                name='role'
                onChange={(e) => setRole(e.target.value)}
                value={role}
                id="signupInput"
                placeholder='Role (Optional)'
              ></input>
            </div>
            {/* <div className="signupOuterInput">
              <input
                type='text'
                name='image'
                onChange={(e) => setImage(e.target.value)}
                value={image}
                id="signupInput"
                placeholder='Image'
              ></input>
            </div> */}
            <div className="signupOuterInput">
              <input
                type='text'
                name='pronouns'
                onChange={(e) => setPronouns(e.target.value)}
                value={pronouns}
                id="signupInput"
                placeholder='Pronouns (Optional)'
              ></input>
            </div>
            <div className="signupOuterInput">
              <input
                type='text'
                name='department'
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
                id="signupInput"
                placeholder='Department (Optional)'
              ></input>
            </div>
            <div className="signupOuterInput">
              <textarea
                type='text'
                name='bio'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                rows="5"
                placeholder="Have important information to share with your team like: My hours are 9am-5pm? Write them here!"
                id="signupTextArea"
              ></textarea>
            </div>
            <div className="signupOuterInput">
              <input
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="signupInput"
                placeholder='Password'
              ></input>
            </div>
            <div className="signupOuterInput">
              <input
                type='password'
                name='repeat_password'
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                required={true}
                id="signupInput"
                placeholder='Repeat Password'
              ></input>
            </div>
            <button type='submit' className='signupButton'>Sign Up</button>
          </form>
        </div>
        <div className='signupMedia'>
          <img src="/static/images/signupPageImage.png" alt="computer signup" className='signupImage' />
        </div>
      </div>
    </div>

  );
};

export default SignUpPage;
