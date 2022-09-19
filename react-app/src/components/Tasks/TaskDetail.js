import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTaskById } from "../../store/tasks";
import { useParams, useHistory } from 'react-router-dom';
import { deleteOneTask } from '../../store/tasks';

const TaskDetail = () => {
    const { taskId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks)
    const task = tasks[taskId]

    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    if (!task) { return null }
    return (
        <>
            <h1>Hi</h1>
            <div>{task.name}</div>
            <div>{task.complete.toString()}</div>
            <button onClick={async () => {
                await dispatch(deleteOneTask(taskId))
                history.push('/tasks')
            }}>Delete</button>
        </>
    )
}

export default TaskDetail
