import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

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

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error.split(":")[1]}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Role</label>
        <input
          type='text'
          name='role'
          onChange={(e) => setRole(e.target.value)}
          value={role}
        ></input>
      </div>
      <div>
        <label>Image</label>
        <input
          type='text'
          name='image'
          onChange={(e) => setImage(e.target.value)}
          value={image}
        ></input>
      </div>
      <div>
        <label>Pronouns</label>
        <input
          type='text'
          name='pronouns'
          onChange={(e) => setPronouns(e.target.value)}
          value={pronouns}
        ></input>
      </div>
      <div>
        <label>Department</label>
        <input
          type='text'
          name='department'
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
        ></input>
      </div>
      <div>
        <label>Biography</label>
        <input
          type='text'
          name='bio'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
