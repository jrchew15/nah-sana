import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTaskById } from "../../store/tasks";
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { taskId } = useParams()
    const dispatch = useDispatch()
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
        </>
    )
}

export default TaskDetail
