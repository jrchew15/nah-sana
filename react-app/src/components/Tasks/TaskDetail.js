import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTaskById } from "../../store/tasks";
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
    const { taskId } = useParams()
    const dispatch = useDispatch()
    const task = useSelector((state) => state.tasks)
    console.log('**********tasks from component****', task)

    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    return (
        <>
            <h1>Hi</h1>
            <div>{task.name}</div>
        </>
    )
}

export default TaskDetail
