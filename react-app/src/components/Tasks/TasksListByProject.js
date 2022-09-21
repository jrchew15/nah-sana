import { getTasksByProjectId } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";


import { Route, useParams, useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";
import TaskDetail from "./TaskDetail";
// REVISIT CSS
import './TaskStyle/TaskDetail.css'
import './TaskList.css'

const TasksListByProject = ({ projectId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    console.log(tasks)

    const [showTaskDetail, setShowTaskDetail] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    // console.log('**********projects from component****', projects)
    // console.log('**********tasks from component****', tasks)

    useEffect(() => {
        dispatch(getTasksByProjectId(projectId)).then(() => setIsLoaded(true))
    }, [dispatch, showTaskDetail])

    if (!tasksArr.length) return null
    return isLoaded ? (
        <>

            {/* REVISIT
            <div className="task-container-list">
                {tasksArr.map((task) => (
                    <>
                        <div className="task-flex">
                            <button className="task-button">
                                <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                            </button>
                            <div className="task-items">{task.name}</div>
                        </div>
                    </>
                ))}
            </div>
            {/* <NavLink to={`/tasks/${task.id}`} className="task-items">
                        <li>
                            {task.name}
                        </li>
                    </NavLink> */}

            <table>
                <tr>
                    <th>Task Name</th>
                    <th>Due Date</th>
                </tr>
                {tasksArr.map((task) => (
                    <tr key={task.id}>
                        <td>
                            <i className="fa-thin fa-circle-check"></i>
                            {task.name}
                        </td>
                        <td>{task.dueDate.split(' ')[2]} {task.dueDate.split(' ')[1]}</td>
                        <button onClick={() => (
                            setShowTaskDetail(!showTaskDetail),
                            setOnClickTaskId(task.id)
                            // history.push(`/tasks/${task.id}`)
                        )}>details</button>
                    </tr>
                ))}
            </table>
            {showTaskDetail ? <TaskDetail taskId={onClickTaskId} /> : null}

        </>
    ) : null
}

export default TasksListByProject
