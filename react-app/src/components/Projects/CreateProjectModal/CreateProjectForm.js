import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createAProject } from '../../../store/projects';

const CreateProjectForm = () => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [ownerId, setOwnerId] = useState(user.id || '')
  // REVISIT THIS WHEN WORKSPACE IS ADDED TO STATE
  let workspaceId = 1

  const dispatch = useDispatch();
  const createProject = async (e) => {
    e.preventDefault();
    let payload = { workspaceId, name, status, dueDate, description, icon, ownerId }
    const data = await dispatch(createAProject(payload));
    if (data) {
      setErrors(data)
    }
  };

  return (
    <form onSubmit={createProject}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>Name</label>
        <input
          type='text'
          name='name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
      </div>
      <div>
        <label>Status</label>
        <select
          name='status'
          onChange={(e) => setStatus(e.target.value)}
          value={status}>
          <option value="On Track">
            On Track
          </option>
          <option value="At Risk">
            At Risk
          </option>
          <option value="Off Track">
            Off Track
          </option>
          <option value="On Hold">
            On Hold
          </option>
          <option value="Complete">
            Complete
          </option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input
          type='date'
          name='dueDate'
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type='text'
          name='description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </div>
      <div>
        <label>Icon</label>
        <input
          type='text'
          name='icon'
          onChange={(e) => setIcon(e.target.value)}
          value={icon}
        ></input>
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default CreateProjectForm;
