import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTasksByProjectId } from "../../store/tasks";
import { useParams } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    // console.log('**********tasks from component****', tasksArr)

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    // let projectId = useParams()
    // console.log(projectId)
    // useEffect(() => {
    //     dispatch(getTasksByProjectId(projectId.projectId))
    // }, [dispatch])

    if (!tasksArr.length) return null
    return (
        <>
            {tasksArr.map((task) => (
                <div>{task.name}</div>
            ))}
        </>
    )
}

export default TaskList
