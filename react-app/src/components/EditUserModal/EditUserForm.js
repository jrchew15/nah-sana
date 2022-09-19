import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../store/session';

const EditUserForm = () => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [role, setRole] = useState(user.role || '');
  const [image, setImage] = useState(user.image || '');
  const [pronouns, setPronouns] = useState(user.pronouns || '');
  const [department, setDepartment] = useState(user.department || '');
  const [bio, setBio] = useState(user.bio || '');


  const dispatch = useDispatch();

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    const data = await dispatch(updateProfile(user, firstName, lastName, role, image, pronouns, department, bio));
    if (data) {
      setErrors(data)
    } 
  };

  return (
    <form onSubmit={onUpdateProfile}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
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
      <button type='submit'>Submit</button>
    </form>
  );
};

export default EditUserForm;
