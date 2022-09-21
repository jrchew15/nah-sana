import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createOneTask, updateOneTask } from '../../store/tasks';
import { getTaskById } from '../../store/tasks';

import './TaskStyle/TaskForm.css'

const TaskForm = ({ taskId, setShowModal, userId, projectId }) => {
    const dispatch = useDispatch();
    // const workspace = useSelector((state) => state.workspace.users)
    // console.log('**************workspace', workspace)
    // const { taskId } = useParams();
    // const task = useSelector(state => state.tasks)
    const [task, setTask] = useState(null)

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const [userId, setUserId] = useState(userId || 0);
    const [projectId, setProjectId] = useState(projectId || 0);
    const [showForm, setShowForm] = useState(true)


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
        setShowModal(false)
        let formData = {
            name,
            dueDate,
            description,
            userId,
            projectId,
            complete
        }
        console.log('*********in task form component*******', formData)
        if (!task) {
            const data = await dispatch(createOneTask(formData))
        } else {
            formData.id = taskId;
            const data = await dispatch(updateOneTask(formData))
        }
    }

    return (
        <>
            {showForm && (
                <div className='form-container'>
                    <div id='task-form' style={{ marginLeft: '30px' }}>
                        <h2>My Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-row'>
                                <label htmlFor='name' id='form-label'>Name</label>
                                <input id='form-input' type='text' name='name' onChange={e => setName(e.target.value)} value={name} required />
                            </div>
                            <div className='form-row'>
                                <label htmlFor='dueDate' id='form-label'>Due Date</label>
                                <input id='form-input' type='date' name='dueDate' onChange={e => setDueDate(e.target.value)} value={dueDate} />
                            </div>
                            {/* User Id will eventually be chosen from workspace users dropdown */}
                            <div className='form-row'>
                                <label htmlFor='userId' id='form-label'>User Id</label>
                                <input id='form-input' type='number' name='userId' onChange={e => setUserId(e.target.value)} value={userId} />
                            </div>
                            {/* project Id will eventually be chosen from workspace projects dropdown */}
                            <div className='form-row'>
                                <label htmlFor='projectId' id='form-label'>Project Id</label>
                                <input id='form-input' type='number' name='projectId' onChange={e => setProjectId(e.target.value)} value={projectId} />
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
