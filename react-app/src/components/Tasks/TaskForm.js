import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createOneTask } from '../../store/tasks';

const TaskForm = () => {
    const dispatch = useDispatch();

    // const task = useSelector(state => state.tasks)


    const [name, setName] = useState('');
    const [dueDate, setDueDate] = useState();
    const [description, setDescription] = useState('');
    const [complete, setComplete] = useState(false);
    const [userId, setUserId] = useState(0);
    const [projectId, setProjectId] = useState(0);

    // useEffect(() => {

    // }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(createOneTask({
            name,
            dueDate,
            description,
            userId,
            projectId,
            complete
        }))
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
