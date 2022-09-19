import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { useParams } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    console.log('**********tasks from component****', tasksArr)

    // useEffect(() => {
    //     dispatch(getTasks())
    // }, [dispatch])

    let workspaceId = useParams()
    let userId = useParams()
    useEffect(() => {
        dispatch(getTasksByWorkspace(1, 1))
    }, [dispatch])

    if (!tasksArr.length) return null
    return (
        <>
            <table>
                <tr>
                    <th>Task Name</th>
                    <th>Due Date</th>
                </tr>
                {tasksArr.map((task) => (
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.dueDate.split(',')[1]}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default TaskList
