import { getTasks } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";
import { useParams } from "react-router-dom";
import './TaskList.css'

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
        </>
    )
}

export default TaskList
