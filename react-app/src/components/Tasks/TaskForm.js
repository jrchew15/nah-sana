import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOneTask, updateOneTask, deleteOneTask } from '../../store/tasks';
import { getTaskById } from '../../store/tasks';
import { oneWorkspace } from '../../store/workspace'

import './TaskStyle/TaskForm.css'

const TaskForm = ({ taskId, setShowModal, userId: passedUserId, projectId: passedProjectId, setShowTaskDetail, plainForm }) => {
    const dispatch = useDispatch();
    const { workspace, users, projects } = useSelector((state) => state.workspace)
    const workspaceId = workspace.id
    const [task, setTask] = useState(null)

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const [userId, setUserId] = useState(passedUserId || 0);
    const [projectId, setProjectId] = useState(passedProjectId || 0);
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [buttonChange, setButtonChange] = useState('task-form-button')

    useEffect(async () => {

        if (taskId) {
            const foundTask = await dispatch(getTaskById(taskId))
            let inputDate;
            foundTask.dueDate ?
                inputDate = new Date(foundTask.dueDate).toJSON().split("T")[0] : inputDate = ''
            setTask(foundTask)
            setName(foundTask.name)
            setDueDate(inputDate)
            setDescription(foundTask.description)
            setComplete(foundTask.complete)
            setUserId(foundTask.userId)
            setProjectId(foundTask.projectId)
        }
    }, [dispatch])

    useEffect(async () => {
        let errors = []
        if (!name) errors.push('Task Name is required')
        if (!projectId) errors.push('Please choose a project')
        if (!dueDate) errors.push('Please choose a due date')
        if (!userId) errors.push('Please choose a user')
        setErrors(errors)
    }, [name, projectId, userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        let formData = {
            name,
            dueDate,
            description,
            userId,
            projectId,
            complete
        }
        let data
        if (!task) {
            data = await dispatch(createOneTask(formData))
        } else {
            formData.id = taskId;
            data = await dispatch(updateOneTask(formData))
        }
        await dispatch(oneWorkspace(workspaceId))
        if (data) {
            setErrors(data)
            // return
        }
        if (!plainForm) setShowModal(false)
        if (plainForm) setShowTaskDetail(false)
    }

    return (
        <>
            {(
                <div className='task-form-container' style={{ borderLeft: plainForm ? 'solid 1px gray' : 'none' }}>
                    <div className='task-form-top-container' style={{ marginLeft: '30px' }}>
                        <form onSubmit={handleSubmit}>
                            <a href="javascript:void(0)" className="closebtn"
                                style={{ display: plainForm ? 'block' : 'none', marginRight: '35px' }}
                                onClick={() => { setShowTaskDetail(false) }}>&times;</a>
                            <div className='task-complete'
                                style={{
                                    padding: '4px',
                                    backgroundColor: complete.toString() === 'false' ? 'gray' : 'green', cursor: 'pointer'
                                }}
                                onClick={() => (
                                    setComplete(!complete)
                                )}>
                                <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                {complete.toString() === 'false' ? "Mark Complete" : "Completed"}
                            </div>
                            <h2 style={{ marginLeft: '10px' }}>My Task</h2>
                            {hasSubmitted && errors.length > 0 && <div className='errorContainer'>
                                {errors.map((error, ind) => (
                                    <div key={ind} className='errorText'>{error}</div>
                                ))}
                            </div>}
                            <div className='task-input-container'>
                                <label htmlFor='name' className='task-form-label'>Name</label>
                                <input className='task-form-input' type='text' name='name' onChange={e => setName(e.target.value)} value={name} required />
                            </div>
                            <div className='task-input-container'>
                                <label htmlFor='dueDate' className='task-form-label'>Due Date</label>
                                <input className='task-form-input' type='date' name='dueDate' onChange={e => setDueDate(e.target.value)} value={dueDate} />
                            </div>
                            <div className='task-input-container'>
                                <label htmlFor='userId' className='task-form-label'>Assignee</label>
                                <select className='task-select-class' name='userId' required onChange={e => setUserId(e.target.value)} value={userId}
                                    style={{ background: 'none', color: 'whitesmoke' }}>
                                    <option className='task-option' disabled value={0}>Choose a user</option>
                                    {
                                        Object.values(users).map(user => (
                                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='task-input-container'>
                                <label htmlFor='projectId' className='task-form-label'>Project</label>
                                <select name='projectId' required onChange={e => setProjectId(e.target.value)} value={projectId} style={{ background: 'none', color: 'whitesmoke' }}>
                                    <option className='task-option' disabled value={0}>Choose a project</option>
                                    {
                                        projects.map(project => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='task-input-container'>
                                <label htmlFor='description' className='task-form-label' >Description</label>
                                <textarea className='task-form-textarea' type='text' name='description'
                                    style={{ height: '80px' }}
                                    onChange={e => setDescription(e.target.value)} value={description} />
                            </div>
                            <div className='task-form-container'>
                                <button type='submit'
                                    className={`${buttonChange}`}
                                    style={{ marginTop: '3px' }}
                                >Submit</button>
                                {taskId && (
                                    <button
                                        className={`${buttonChange}`}
                                        style={{ background: '#d11a2a' }}
                                        onClick={async () => {
                                            await dispatch(deleteOneTask(taskId))
                                            await dispatch(oneWorkspace(workspaceId))
                                            if (!plainForm) setShowModal(false)
                                            if (plainForm) setShowTaskDetail(false)
                                        }}>Delete</button>
                                )}
                            </div>
                        </form >
                    </div>
                </div >
            )
            }
        </>
    )
}

export default TaskForm
