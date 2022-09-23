import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createAProject } from '../../../store/projects';
import { oneWorkspace } from '../../../store/workspace';
import './CreateProject.css'

const CreateProjectForm = ({ setShowModal }) => {
  const user = useSelector(state => state.session.user);
  const projects = useSelector(state => state.workspace.projects)
  const projectsArray = Object.values(projects)
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('')
  const [status, setStatus] = useState('On Track')
  const [dueDate, setDueDate] = useState()
  const [description, setDescription] = useState('')
  const [buttonChange, setButtonChange] = useState('project-submit-button')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  let ownerId = user.id
  const { id } = useParams()

  const icon = `/static/images/icons/${Math.ceil(Math.random() * 5)}.png`
  useEffect(() => {
    const error = []
    if (name.length > 0) {
      setButtonChange('test')
    }
    if (name.length === 0) {
      setButtonChange('project-submit-button')
    }
    projectsArray.filter(project => {
      if (project.name.toLowerCase() === name.toLowerCase()) {
        error.push('Error: Project with that name already exists')
      }
    })
    setErrors(error)
  }, [name, dueDate])

  let workspaceId = id
  const dispatch = useDispatch();
  const createProject = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)

    let payload = { workspaceId, name, status, dueDate, description, icon, ownerId }
    if (!errors.length) {
      let data = await dispatch(createAProject(payload));
      if (Array.isArray(data)) {
        setErrors(data)
      } else {
        await dispatch(oneWorkspace(id))
        await history.push(`/workspaces/${workspaceId}/projects/${data.id}`)
        await setShowModal(false)
      }
    }
  };

  return (
    <div className='project-create-form-container'>
      <div className='project-top-container'>
        <h2>New Project</h2>
        <button className="create-button" onClick={() => setShowModal(false)}>X</button>
      </div>
      <form onSubmit={createProject}>
        {hasSubmitted && errors.length > 0 && (<div className='errorContainer project-errors '>
          {errors.map((error, ind) => (
            <div key={ind} className='errorText'>{error.split(":")[1]}</div>
          ))}
        </div>)}
        <div className='project-input-container'>
          <label className='project-input-label'>Project Name</label>
          <input
            maxLength={25}
            type='text'
            name='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Your project name"
          ></input>
        </div>
        <div className='project-input-container'>
          <label className='project-input-label'>Status</label>
          <select
            className='project-select-class'
            name='status'
            onChange={(e) => setStatus(e.target.value)}
            value={status}>
            <option className='project-option' value="On Track">
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
        <div className='project-input-container'>
          <label className='project-input-label'>Due Date</label>
          <input
            type='date'
            name='dueDate'
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          ></input>
        </div>
        <div className='project-input-container'>
          <label className='project-input-label'>Description</label>
          <textarea
            className='text-area-style'
            type='text'
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Add a description of your project here (Optional)"
            style={{ resize: 'none', height: '5em' }}
          ></textarea>
        </div>
        <div className='project-input-container move-button-down'>
          <button className={`${buttonChange}`} type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
