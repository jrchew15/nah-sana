import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { useHistory, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { Route } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
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
                    <tr key={task.id}>
                        <td>
                            {task.name}
                            <button onClick={() => (
                                history.push('/tasks/${task.id}')
                            )
                            }>details</button>
                        </td>
                        <td>{task.dueDate}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}

export default TaskList
