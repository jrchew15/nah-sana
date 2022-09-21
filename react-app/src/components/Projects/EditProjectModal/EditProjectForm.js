import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { updateAProject } from '../../../store/projects';

const EditProjectForm = ({ project }) => {

  let inputDate;
  project.dueDate ?
    inputDate = new Date(project.dueDate).toJSON().split("T")[0] : inputDate = ''

  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(project.name || '')
  const [status, setStatus] = useState(project.status || '')
  const [dueDate, setDueDate] = useState(inputDate)
  const [description, setDescription] = useState(project.description || '')
  const [icon, setIcon] = useState(project.icon || '')
  let ownerId = user.id
  const { workspaceId } = useParams()

  const dispatch = useDispatch();
  const editProject = async (e) => {
    e.preventDefault();
    let payload = { id: project.id, workspaceId, name, status, dueDate, description, icon, ownerId }
    const data = await dispatch(updateAProject(payload));
    if (data) {
      setErrors(data)
    }
  };

  return (
    <form onSubmit={editProject}>
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

export default EditProjectForm;
