import { getTasksByProjectId } from "../../store/tasks";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTasksByWorkspace } from "../../store/tasks";


import { Route, useParams, useHistory } from "react-router-dom";
import TaskForm from "./TaskForm";
// import TaskDetail from "./TaskDetail";
// REVISIT CSS
import './TaskStyle/TaskDetail.css'
import './TaskList.css'
import './TaskStyle/TaskTable.css'
import TaskDetail from "./TaskDetail";

const TasksListByProject = ({ projectId }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const tasks = useSelector((state) => state.tasks)
    const tasksArr = Object.values(tasks)
    console.log(tasks)

    const [showTaskDetail, setShowTaskDetail] = useState(false)
    const [onClickTaskId, setOnClickTaskId] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    // console.log('**********projects from component****', projects)
    // console.log('**********tasks from component****', tasks)

    useEffect(() => {
        dispatch(getTasksByProjectId(projectId)).then(() => setIsLoaded(true))
    }, [dispatch, showTaskDetail])

    if (!tasksArr.length) return null
    return isLoaded ? (
        <div style={{ display: 'flex' }}>
            <table className={showTaskDetail ? "table-onclick" : "table"}>
                <tr className="table-row">
                    <th className="table-head">Task Name</th>
                    <th className="table-head">Due Date</th>
                </tr>
                {tasksArr.map((task) => (

                    <tr key={task.id} className="table-row">
                        <td className="table-cell" id='task-name'>
                            <div>{task.name}</div>
                            <div id='button' onClick={() => (
                                setShowTaskDetail(!showTaskDetail),
                                setOnClickTaskId(task.id),
                                setShowSideBar(!showSideBar)
                            )}>details</div>
                        </td>
                        <td className="table-cell">{task.dueDate.split(' ')[2]} {task.dueDate.split(' ')[1]}</td>
                    </tr>
                ))
                }
            </table >
            <div>
                {showTaskDetail ? <TaskDetail taskId={onClickTaskId} setShowTaskDetail={setShowTaskDetail} /> : null}
            </div>
        </div >
    ) : null
}

export default TasksListByProject
