import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createOneTask, updateOneTask } from '../../store/tasks';
import { getTaskById } from '../../store/tasks';

import './TaskStyle/TaskForm.css'

const TaskForm = ({ taskId, setShowModal, userId: passedUserId, projectId: passedProjectId }) => {
    const dispatch = useDispatch();
    const { users, projects } = useSelector((state) => state.workspace)
    // console.log('**************workspace', workspace)
    // const { taskId } = useParams();
    // const task = useSelector(state => state.tasks)
    const [task, setTask] = useState(null)

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const [userId, setUserId] = useState(passedUserId || 0);
    const [projectId, setProjectId] = useState(passedProjectId || 0);
    const [errors, setErrors] = useState([])


    useEffect(async () => {
        // console.log('*********in use effct 1*******', taskId)
        if (taskId) {
            const foundTask = await dispatch(getTaskById(taskId))
            // console.log('*********in use effct 2*******', foundTask)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        if (data) {
            setErrors(data)
            return
        }
        setShowModal(false)
    }

    return (
        <>
            {(
                <div className='form-container'>
                    <div id='task-form' style={{ marginLeft: '30px' }}>
                        <h2>My Task</h2>
                        <form onSubmit={handleSubmit}>
                            {errors.length > 0 && <div className='form-row'>
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>}
                            <div className='form-row'>
                                <label htmlFor='name' id='form-label'>Name</label>
                                <input id='form-input' type='text' name='name' onChange={e => setName(e.target.value)} value={name} required />
                            </div>
                            <div className='form-row'>
                                <label htmlFor='dueDate' id='form-label'>Due Date</label>
                                <input id='form-input' type='date' name='dueDate' onChange={e => setDueDate(e.target.value)} value={dueDate} />
                            </div>
                            <div className='form-row'>
                                <label htmlFor='userId' id='form-label'>User Id</label>
                                <select name='userId' onChange={e => setUserId(e.target.value)} value={userId}>
                                    <option disabled value=''>Choose a user</option>
                                    {
                                        Object.values(users).map(user => (
                                            <option value={user.id}>{user.firstName} {user.lastName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor='projectId' id='form-label'>Project Id</label>
                                <select name='projectId' onChange={e => setProjectId(e.target.value)} value={projectId}>
                                    <option disabled value=''>Choose a project</option>
                                    {
                                        projects.map(project => (
                                            <option value={project.id}>{project.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-row'>
                                <label htmlFor='description' id='form-label'>Description</label>
                                <input id='form-input' type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} />
                            </div>
                            <div className='form-row'>
                                <label htmlFor='complete' id='form-label'>Complete</label>
                                <input id='form-input' type='checkbox' name='complete' onChange={e => setComplete(compl => !compl)} checked={complete} />
                            </div>
                            <button id='form-button' type='submit'>Submit</button>
                        </form >
                    </div>
                </div >
            )
            }
        </>
    )
}

export default TaskForm
