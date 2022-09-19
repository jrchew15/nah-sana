import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createOneTask, updateOneTask } from '../../store/tasks';
import { getTaskById } from '../../store/tasks';

const TaskForm = () => {
    const dispatch = useDispatch();

    const { taskId } = useParams();
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
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' onChange={e => setName(e.target.value)} value={name} required />
                <label htmlFor='dueDate'>Due Date</label>
                <input type='date' name='dueDate' onChange={e => setDueDate(e.target.value)} value={dueDate} />
                <label htmlFor='description'>Description</label>
                <input type='text' name='description' onChange={e => setDescription(e.target.value)} value={description} />
                <label htmlFor='complete'>Complete</label>
                <input type='checkbox' name='complete' onChange={e => setComplete(compl => !compl)} checked={complete} />
                {/* User Id will eventually be chosen from workspace users dropdown */}
                <label htmlFor='userId'>User Id</label>
                <input type='number' name='userId' onChange={e => setUserId(e.target.value)} value={userId} />
                {/* project Id will eventually be chosen from workspace projects dropdown */}
                <label htmlFor='projectId'>Project Id</label>
                <input type='number' name='projectId' onChange={e => setProjectId(e.target.value)} value={projectId} />
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default TaskForm
