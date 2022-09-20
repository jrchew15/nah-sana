import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createOneTask, updateOneTask } from '../../store/tasks';
import { getTaskById } from '../../store/tasks';

import './TaskStyle/TaskForm.css'

const TaskForm = ({ taskId }) => {
    const dispatch = useDispatch();

    // const { taskId } = useParams();
    // const task = useSelector(state => state.tasks)
    const [task, setTask] = useState(null)

    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const [userId, setUserId] = useState(0);
    const [projectId, setProjectId] = useState(0);

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
        if (!task) {
            const data = await dispatch(createOneTask(formData))
        } else {
            formData.id = taskId;
            const data = await dispatch(updateOneTask(formData))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>
                    Name
                    <input type='text' name='name' onChange={e => setName(e.target.value)} value={name} required />
                </label>
                <label htmlFor='dueDate'>
                    Due Date
                    <input type='date' name='dueDate' onChange={e => setDueDate(e.target.value)} value={dueDate} />
                </label>
                <label htmlFor='description'>
                    Description
                    <input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} />
                </label>
                <label htmlFor='complete'>
                    Complete
                    <input type='checkbox' name='complete' onChange={e => setComplete(compl => !compl)} checked={complete} />
                </label>
                {/* User Id will eventually be chosen from workspace users dropdown */}
                <label htmlFor='userId'>
                    User Id
                    <input type='number' name='userId' onChange={e => setUserId(e.target.value)} value={userId} />
                </label>
                {/* project Id will eventually be chosen from workspace projects dropdown */}
                <label htmlFor='projectId'>
                    Project Id
                    <input type='number' name='projectId' onChange={e => setProjectId(e.target.value)} value={projectId} />
                </label>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default TaskForm
