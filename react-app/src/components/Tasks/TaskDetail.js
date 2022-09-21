import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTaskById } from "../../store/tasks";
import { useParams, useHistory } from 'react-router-dom';
import { deleteOneTask } from '../../store/tasks';
import TaskForm from './TaskForm';
import './TaskStyle/TaskDetail.css';

const TaskDetail = ({ taskId }) => {
    // const { taskId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const tasks = useSelector((state) => state.tasks)
    const task = tasks[taskId]

    const [showSideBar, setShowSideBar] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [taskComplete, setTaskComplete] = useState(false)
    const [showTaskDetail, setShowTaskDetail] = useState(true)

    useEffect(() => {
        dispatch(getTaskById(taskId))
    }, [dispatch])

    if (!task) { return null }
    return (
        <>
            {showTaskDetail && (
                <div id={showSideBar ? 'slider-out' : 'slider'}>
                    <a href="javascript:void(0)" className="closebtn" onClick={() => { setShowSideBar(!showSideBar) }}>&times;</a>
                    <div id='task-complete' className='task-complete'
                        style={{ backgroundColor: taskComplete.toString() === 'false' ? 'white' : 'lime' }}
                        onClick={() => (
                            setTaskComplete(!taskComplete)
                            // handleSubmit()
                        )}>
                        <i class="fa fa-check-circle-o" aria-hidden="true"></i>
                        {taskComplete.toString() === 'false' ? "Mark Complete" : "Completed"}
                    </div>
                    <div className='task-name'>{task.name}</div>
                    <table>
                        <tr className='task-detail'>
                            <th>Due Date</th>
                            <td>{task.dueDate.split(' ')[2]}{task.dueDate.split(' ')[1]}</td>
                        </tr>
                        <tr className='task-detail'>
                            <th>Projects</th>
                            <td>{task.projectId}</td>
                        </tr>
                        <tr className='task-detail'>
                            <th>Description</th>
                            <td> {task.description}</td>
                        </tr>
                    </table>
                    <button onClick={() => {
                        setShowForm(true)
                        setShowTaskDetail(false)
                    }}>Edit</button>
                    <button onClick={async () => {
                        await dispatch(deleteOneTask(taskId))
                        history.push('/tasks')
                    }}>Delete</button>
                    {showForm ? <TaskForm taskId={taskId} /> : null}
                </div >
            )
            }
        </>
    )
}

export default TaskDetail
